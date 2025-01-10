import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { FilesService } from 'src/app/files/files.service';

@Injectable()
export class ProductImagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async create(data: UploadImageDto, imageUrl: string) {
    try {
      const file = await this.filesService.create({ url: imageUrl });
      const payload = {
        product_id: data.product_id,
        file_id: file.id,
      };
      return await this.prisma.productImages.create({ data: payload });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.prisma.productImages.findMany({
      where: { deletedAt: null },
      include: {
        file: true,
        product: true,
      },
    });
  }

  async findAllByProduct(product_id: string) {
    return await this.prisma.productImages.findMany({
      where: { product_id, deletedAt: null },
      include: {
        file: true,
        product: true,
      },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.productImages.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: {
          file: true,
          product: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateProductImageDto) {
    return await this.prisma.productImages.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.productImages.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`productImage with id ${id} not found`);
    }
  }
}

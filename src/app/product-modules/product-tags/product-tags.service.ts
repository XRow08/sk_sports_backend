import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductTagDto) {
    try {
      return await this.prisma.productTag.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.prisma.productTag.findMany({
      where: { deletedAt: null },
      include: { product: true, tag: true },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.productTag.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { product: true, tag: true },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateProductTagDto) {
    return await this.prisma.productTag.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.productTag.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`productTag with id ${id} not found`);
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductBalanceDto } from './dto/create-product-balance.dto';
import { UpdateProductBalanceDto } from './dto/update-product-balance.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ProductBalanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async create(data: CreateProductBalanceDto) {
    try {
      const productExist = this.productsService.findOneById(data.product_id);
      if (!productExist) {
        throw new BadRequestException('Produto não existe na loja');
      }
      return await this.prisma.productBalance.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.prisma.productBalance.findMany({
      where: { deletedAt: null },
    });
  }

  async findAllByShop(shop_id: string) {
    return await this.prisma.productBalance.findMany({
      where: { shop_id, deletedAt: null },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.productBalance.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { product: true },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateProductBalanceDto) {
    return await this.prisma.productBalance.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.productBalance.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`productBalance with id ${id} not found`);
    }
  }
}

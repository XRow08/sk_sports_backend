import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRateProductDto } from './dto/create-rate-product.dto';
import { UpdateRateProductDto } from './dto/update-rate-product.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RateProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createNew(data: CreateRateProductDto) {
    try {
      if (data.rate > 5) throw new BadRequestException('Rate limit 5');
      return await this.prisma.rateProduct.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(startTime?: number, endTime?: number) {
    const where: any = { deletedAt: null };
    if (startTime && endTime) {
      where.createdAt = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      };
    }
    return this.prisma.rateProduct.findMany({
      where,
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.rateProduct.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneByProductId(product_id: string) {
    try {
      const rates = await this.prisma.rateProduct.findMany({
        where: { product_id, deletedAt: null },
      });
      const rateTotal = rates.reduce((acc, rate) => acc + Number(rate.rate), 0);
      return rateTotal / rates.length;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAllByProduct(
    product_id: string,
    startTime?: number,
    endTime?: number,
  ) {
    const where: any = { product_id, deletedAt: null };
    if (startTime && endTime) {
      where.createdAt = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      };
    }
    return this.prisma.rateProduct.findMany({
      where,
    });
  }

  async updateById(id: string, data: UpdateRateProductDto) {
    return await this.prisma.rateProduct.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.rateProduct.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`rateProduct with id ${id} not found`);
    }
  }
}

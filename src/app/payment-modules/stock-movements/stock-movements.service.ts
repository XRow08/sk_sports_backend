import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StockMovementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStockMovementDto) {
    try {
      return await this.prisma.stockMovements.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.stockMovements.findMany({
      where: { deletedAt: null },
      include: { product: true },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.stockMovements.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { product: true },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateStockMovementDto) {
    return await this.prisma.stockMovements.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.stockMovements.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`stockMovements with id ${id} not found`);
    }
  }
}

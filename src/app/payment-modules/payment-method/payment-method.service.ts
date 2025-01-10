import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentMethodDto) {
    try {
      return await this.prisma.paymentMethod.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.paymentMethod.findMany({
      where: { deletedAt: null },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.paymentMethod.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdatePaymentMethodDto) {
    return await this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.paymentMethod.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`paymentMethod with id ${id} not found`);
    }
  }
}

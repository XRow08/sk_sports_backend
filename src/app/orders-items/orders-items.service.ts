import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../product-modules/products/products.service';

@Injectable()
export class OrdersItemsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  async create(data: CreateOrdersItemDto) {
    try {
      console.log(data);
      return await this.prisma.orderItem.create({ data });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.orderItem.findMany({
      where: { deletedAt: null },
      include: { product: true },
    });
  }

  async findAllByOrderId(order_id: string) {
    return this.prisma.orderItem.findMany({
      where: { order_id, deletedAt: null },
      include: { product: true },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.orderItem.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { product: true },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateOrdersItemDto) {
    const update = await this.prisma.orderItem.update({
      where: { id },
      data,
    });
    await this.ordersService.updateById(update.order_id, {});
    return update;
  }

  async deleteById(id: string) {
    try {
      const orderItem = await this.findOneById(id);
      await this.prisma.orderItem.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      await this.ordersService.updateById(orderItem.order_id, {});
    } catch (error) {
      throw new NotFoundException(`order item with id ${id} not found`);
    }
  }
}

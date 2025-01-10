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
    private readonly productService: ProductsService,
  ) {}

  async create(data: CreateOrdersItemDto) {
    try {
      const product = await this.productService.findOneById(data.product_id);
      const payloadItem = {
        ...data,
        each_price: Number(product.price),
        total_price: Number(product.price) * data.quantity,
      };
      const item = await this.prisma.orderItem.create({ data: payloadItem });
      await this.ordersService.updateById(item.order_id, {});
      return item;
    } catch (error) {
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
    const item = await this.findOneById(id);
    const updatedTotalPrice = data.quantity
      ? data.quantity * Number(item.each_price)
      : Number(item.total_price);
    const update = await this.prisma.orderItem.update({
      where: { id },
      data: { ...data, total_price: updatedTotalPrice },
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

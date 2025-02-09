import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersItemsService } from '../orders-items/orders-items.service';
import axios from 'axios';
import { calcularPrecoPrazo } from 'correios-brasil';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => OrdersItemsService))
    private readonly orderItemService: OrdersItemsService,
  ) {}

  async create(data: CreateOrderDto) {
    try {
      const existingOrder = await this.prisma.order.findFirst({
        where: {
          user_id: data.user_id,
          status: 'waiting_payment',
          deletedAt: null,
        },
      });
      if (existingOrder) return existingOrder;
      return await this.prisma.order.create({ data });
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
    return await this.prisma.order.findMany({
      where,
      include: { user: true },
    });
  }

  async findAllAbandoned(startTime?: number, endTime?: number) {
    const where: any = { deletedAt: null };
    if (startTime && endTime) {
      where.createdAt = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      };
    }
    const orders = await this.prisma.order.findMany({
      where,
      include: { user: true },
    });
    const now = Date.now();
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt).getTime();
      const isOlderThanOneDay = now - orderDate > 24 * 60 * 60 * 1000;
      const isNotPaid = order.status !== 'paid';
      return isOlderThanOneDay && isNotPaid;
    });
  }

  async findAllRefund(startTime?: number, endTime?: number) {
    const where: any = { deletedAt: null };
    if (startTime && endTime) {
      where.createdAt = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      };
    }
    const orders = await this.prisma.order.findMany({
      where,
      include: { user: true },
    });
    return orders.filter((order) => order.status !== 'refund');
  }


  async findOneById(id: string) {
    try {
      return await this.prisma.order.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { user: true },
      });

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAllByUserId(user_id: string) {
    try {
      return await this.prisma.order.findMany({
        where: { user_id, deletedAt: null },
        include: { user: true },
      });

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateOrderDto) {
    try {
      return this.prisma.order.update({ where: { id }, data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async calculatePortage(order_id: string, cep: string) {
    const orderItems = await this.orderItemService.findAllByOrderId(order_id);
    const totalShirts = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const args = {
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      nVlDiametro: '0',
    };

    try {
      const response = await calcularPrecoPrazo(args);
      return response[0];
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Erro dos Correios: ${error.response.data || error.message}`,
        );
      } else if (error.request) {
        throw new Error(
          'Erro de conexão com os Correios. Tente novamente mais tarde.',
        );
      } else {
        throw new Error(
          `Erro ao calcular o frete: ${error.message || 'Erro desconhecido'}`,
        );
      }
    }
  }

  async getCoordinates(cep: string): Promise<{ lat: number; lon: number }> {
    try {
      const apiKey = process.env.OPENCAGE_API_KEY;
      const sanitizedCep = cep.replace(/\D/g, '');
      const baseUrl = `https://api.opencagedata.com/geocode/v1/json`;
      const url = `${baseUrl}?q=${sanitizedCep}&key=${apiKey}&countrycode=BR&limit=1`;
      const response = await axios.get(url);
      const location = response.data.results[0].geometry;
      return { lat: location.lat, lon: location.lng };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) {
    const R = 6371;
    const dLat = await this.deg2rad(lat2 - lat1);
    const dLon = await this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(await this.deg2rad(lat1)) *
        Math.cos(await this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async calculateDistanceByRoad(
    originLat: number,
    originLon: number,
    destLat: number,
    destLon: number,
  ) {
    const R = 6371;
    const dLat = ((destLat - originLat) * Math.PI) / 180;
    const dLon = ((destLon - originLon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((originLat * Math.PI) / 180) *
        Math.cos((destLat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  async deleteById(id: string) {
    try {
      await this.prisma.order.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`order with id ${id} not found`);
    }
  }
}

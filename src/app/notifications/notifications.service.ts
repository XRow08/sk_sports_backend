import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNew(data: CreateNotificationDto) {
    try {
      return await this.prisma.notification.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.notification.findMany({ where: { deletedAt: null } });
  }

  async findAllByUserId(user_id: string) {
    return this.prisma.notification.findMany({
      where: { user_id, deletedAt: null },
    });
  }

  async findAllByCustomerId(customer_id: string) {
    return this.prisma.notification.findMany({
      where: { customer_id, deletedAt: null },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.notification.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.notification.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`notification with id ${id} not found`);
    }
  }
}

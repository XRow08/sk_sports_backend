import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createNew(data: CreateAddressDto) {
    try {
      return await this.prisma.address.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.address.findMany();
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.address.findFirstOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateAddressDto) {
    return await this.prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.address.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`address with id ${id} not found`);
    }
  }
}

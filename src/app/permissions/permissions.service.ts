import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNew(data: CreatePermissionDto) {
    try {
      return await this.prisma.permission.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.permission.findMany();
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.permission.findFirstOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdatePermissionDto) {
    return await this.prisma.permission.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.permission.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`permission with id ${id} not found`);
    }
  }
}

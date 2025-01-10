import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TrafficService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(ipAddress: string) {
    const existingVisit = await this.findOneByIp(ipAddress);
    if (existingVisit) return;
    await this.prisma.traffic.create({ data: { ipAddress } });
  }

  async findOneByIp(ipAddress: string) {
    const existingVisit = await this.prisma.traffic.findFirst({
      where: {
        ipAddress,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
    return existingVisit;
  }

  async findAll(startTime?: number, endTime?: number) {
    return await this.prisma.traffic.findMany({
      where: { deletedAt: null },
    });
  }
}

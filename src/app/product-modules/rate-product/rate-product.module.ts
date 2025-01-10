import { Module } from '@nestjs/common';
import { RateProductService } from './rate-product.service';
import { RateProductController } from './rate-product.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [RateProductController],
  providers: [RateProductService, PrismaService]
})
export class RateProductModule {}

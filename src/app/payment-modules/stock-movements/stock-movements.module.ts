import { Module } from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { StockMovementsController } from './stock-movements.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [StockMovementsController],
  providers: [StockMovementsService, PrismaService],
})
export class StockMovementsModule {}

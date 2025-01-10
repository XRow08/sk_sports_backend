import { Module } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { ProductTagsController } from './product-tags.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ProductTagsController],
  providers: [ProductTagsService, PrismaService],
})
export class ProductTagsModule {}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProductImagesService } from '../product-images/product-images.service';
import { FilesService } from '../../files/files.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    ProductImagesService,
    FilesService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}

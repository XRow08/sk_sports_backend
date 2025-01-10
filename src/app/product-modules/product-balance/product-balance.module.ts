import { Module } from '@nestjs/common';
import { ProductBalanceService } from './product-balance.service';
import { ProductBalanceController } from './product-balance.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { ProductImagesService } from '../product-images/product-images.service';
import { FilesService } from 'src/app/files/files.service';

@Module({
  controllers: [ProductBalanceController],
  providers: [
    ProductBalanceService,
    PrismaService,
    ProductsService,
    CategoriesService,
    ProductImagesService,
    FilesService,
  ],
})
export class ProductBalanceModule {}

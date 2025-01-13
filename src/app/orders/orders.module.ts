import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersItemsService } from '../orders-items/orders-items.service';
import { ProductsService } from '../product-modules/products/products.service';
import { FilesService } from '../files/files.service';
import { ProductImagesService } from '../product-modules/product-images/product-images.service';
import { CepService } from '../cep/cep.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    OrdersItemsService,
    ProductsService,
    ProductImagesService,
    FilesService,
    CepService,
  ],
})
export class OrdersModule {}

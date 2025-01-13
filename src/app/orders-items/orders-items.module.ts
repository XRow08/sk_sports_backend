import { Module } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { OrdersItemsController } from './orders-items.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../product-modules/products/products.service';
import { FilesService } from '../files/files.service';
import { ProductImagesService } from '../product-modules/product-images/product-images.service';
import { CepService } from '../cep/cep.service';

@Module({
  controllers: [OrdersItemsController],
  providers: [
    OrdersItemsService,
    PrismaService,
    OrdersService,
    ProductsService,
    ProductImagesService,
    FilesService,
    OrdersService,
    CepService,
  ],
})
export class OrdersItemsModule {}

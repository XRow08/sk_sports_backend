import { Module } from '@nestjs/common';
import { AppmaxService } from './appmax.service';
import { AppmaxController } from './appmax.controller';
import { UserService } from 'src/app/user/user.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { OrdersItemsService } from 'src/app/orders-items/orders-items.service';
import { PrismaService } from 'src/database/prisma.service';
import { CepService } from 'src/app/cep/cep.service';
import { ProductsService } from 'src/app/product-modules/products/products.service';
import { ProductImagesService } from 'src/app/product-modules/product-images/product-images.service';
import { FilesService } from 'src/app/files/files.service';

@Module({
  controllers: [AppmaxController],
  providers: [
    AppmaxService,
    UserService,
    OrdersService,
    OrdersItemsService,
    PrismaService,
    CepService,
    ProductsService,
    ProductImagesService,
    FilesService
  ],
})
export class AppmaxModule {}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { IsUnique } from './validators/IsUnique.validator';
import { ExistsConstraint } from './validators/Exists.validator';
import { JWT_PRIVATE_KEY } from './constants';
import { AuthModule } from './app/auth/auth.module';
import { UploadModule } from './app/upload/upload.module';
import { ProductsModule } from './app/product-modules/products/products.module';
import { NotificationsModule } from './app/notifications/notifications.module';
import { StockMovementsModule } from './app/payment-modules/stock-movements/stock-movements.module';
import { PrismaService } from './database/prisma.service';
import { OrdersModule } from './app/orders/orders.module';
import { OrdersItemsModule } from './app/orders-items/orders-items.module';
import { CepModule } from './app/cep/cep.module';
import { FilesModule } from './app/files/files.module';
import { ProductImagesModule } from './app/product-modules/product-images/product-images.module';
import { ProductBalanceModule } from './app/product-modules/product-balance/product-balance.module';
import { TagsModule } from './app/product-modules/tags/tags.module';
import { ProductTagsModule } from './app/product-modules/product-tags/product-tags.module';
import { PermissionsModule } from './app/permissions/permissions.module';
import { TrafficModule } from './app/traffic/traffic.module';
import { TrafficMiddleware } from './app/traffic/traffic.middleware';
import { TrafficService } from './app/traffic/traffic.service';
import { RateProductModule } from './app/product-modules/rate-product/rate-product.module';
import { JwtGuard } from './guards/jwtGuard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './app/user/user.module';
import { AppmaxModule } from './app/payment-modules/appmax/appmax.module';
import { AddressModule } from './app/address/address.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      privateKey: JWT_PRIVATE_KEY,
      secret: JWT_PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    UploadModule,
    UserModule,
    ProductsModule,
    AddressModule,
    NotificationsModule,
    StockMovementsModule,
    OrdersModule,
    OrdersItemsModule,
    CepModule,
    ProductBalanceModule,
    ProductImagesModule,
    FilesModule,
    TagsModule,
    ProductTagsModule,
    PermissionsModule,
    TrafficModule,
    RateProductModule,
    AppmaxModule,
  ],
  controllers: [],
  providers: [
    IsUnique,
    ExistsConstraint,
    PrismaService,
    TrafficService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [IsUnique],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrafficMiddleware).forRoutes('*');
  }
}

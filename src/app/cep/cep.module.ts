import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { OrdersItemsModule } from '../orders-items/orders-items.module';

@Module({
  controllers: [CepController],
  providers: [CepService, OrdersItemsModule]
})
export class CepModule {}

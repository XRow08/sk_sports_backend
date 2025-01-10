import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Method')
@Controller('api/v1/payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) payment method' })
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) payment method' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) payment method' })
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) payment method' })
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.updateById(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) payment method' })
  remove(@Param('id') id: string) {
    return this.paymentMethodService.deleteById(id);
  }
}

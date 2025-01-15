import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Order')
@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um(a) order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) order' })
  @Public()
  @ApiQuery({
    name: 'startTimestamp',
    required: false,
    description:
      'Timestamp de início para filtrar as ordens (em milissegundos)',
    type: Number,
  })
  @ApiQuery({
    name: 'endTimestamp',
    required: false,
    description: 'Timestamp de fim para filtrar as ordens (em milissegundos)',
    type: Number,
  })
  findAll(
    @Query('startTimestamp') startTimestamp?: string,
    @Query('endTimestamp') endTimestamp?: string,
  ) {
    const start = startTimestamp ? Number(startTimestamp) : undefined;
    const end = endTimestamp ? Number(endTimestamp) : undefined;
    return this.ordersService.findAll(start, end);
  }

  @Get('orders/user/:user_id')
  @ApiOperation({ summary: 'Lista todos(as) order do user' })
  @Public()
  findAllByUserId(@Param('user_id') user_id: string) {
    return this.ordersService.findAllByUserId(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) order' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  @Get(':id/calculate/portage/:cep')
  @Public()
  @ApiOperation({ summary: 'Calcula o valor do frete baseado no CEP' })
  calculatePortage(@Param('id') id: string, @Param('cep') cep: string) {
    return this.ordersService.calculatePortage(id, cep);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) order' })
  @Public()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateById(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) order' })
  remove(@Param('id') id: string) {
    return this.ordersService.deleteById(id);
  }
}

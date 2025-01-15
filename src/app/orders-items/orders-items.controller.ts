import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Order Item')
@Controller('/api/v1/orders-items')
export class OrdersItemsController {
  constructor(private readonly ordersItemsService: OrdersItemsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um(a) order item' })
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.ordersItemsService.create(createOrdersItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) order item' })
  findAll() {
    return this.ordersItemsService.findAll();
  }

  @Get('order/:id')
  @ApiOperation({ summary: 'Lista todos(as) order item de uma order' })
  findAllByOrderId(@Param('id') id: string) {
    return this.ordersItemsService.findAllByOrderId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) order item' })
  findOne(@Param('id') id: string) {
    return this.ordersItemsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) order item' })
  update(
    @Param('id') id: string,
    @Body() updateOrdersItemDto: UpdateOrdersItemDto,
  ) {
    return this.ordersItemsService.updateById(id, updateOrdersItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) order item' })
  remove(@Param('id') id: string) {
    return this.ordersItemsService.deleteById(id);
  }
}

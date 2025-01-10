import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock Movements')
@Controller('api/v1/stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) stock movements' })
  create(@Body() data: CreateStockMovementDto) {
    return this.stockMovementsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) stock movements' })
  findAll() {
    return this.stockMovementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) stock movements' })
  findOne(@Param('id') id: string) {
    return this.stockMovementsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) stock movements' })
  updateById(
    @Param('id') id: string,
    @Body() updateStockMovementDto: UpdateStockMovementDto,
  ) {
    return this.stockMovementsService.updateById(id, updateStockMovementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) stock movements' })
  remove(@Param('id') id: string) {
    return this.stockMovementsService.deleteById(id);
  }
}

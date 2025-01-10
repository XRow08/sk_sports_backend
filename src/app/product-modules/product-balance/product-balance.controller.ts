import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductBalanceService } from './product-balance.service';
import { CreateProductBalanceDto } from './dto/create-product-balance.dto';
import { UpdateProductBalanceDto } from './dto/update-product-balance.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product Balance')
@Controller('api/v1/product-balance')
export class ProductBalanceController {
  constructor(private readonly productBalanceService: ProductBalanceService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) product balance' })
  create(@Body() createProductBalanceDto: CreateProductBalanceDto) {
    return this.productBalanceService.create(createProductBalanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) product balance' })
  findAll() {
    return this.productBalanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) product balance' })
  findOne(@Param('id') id: string) {
    return this.productBalanceService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) product balance' })
  update(
    @Param('id') id: string,
    @Body() updateProductBalanceDto: UpdateProductBalanceDto,
  ) {
    return this.productBalanceService.updateById(id, updateProductBalanceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) product balance' })
  remove(@Param('id') id: string) {
    return this.productBalanceService.deleteById(id);
  }
}

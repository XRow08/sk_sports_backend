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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RateProductService } from './rate-product.service';
import { CreateRateProductDto } from './dto/create-rate-product.dto';
import { UpdateRateProductDto } from './dto/update-rate-product.dto';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Rate Product')
@Controller('api/v1/rate-product')
export class RateProductController {
  constructor(private readonly rateProductService: RateProductService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) rate product' })
  create(@Body() createCustomerDto: CreateRateProductDto) {
    return this.rateProductService.createNew(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) rate product' })
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
    return this.rateProductService.findAll(start, end);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) rate product' })
  findOne(@Param('id') id: string) {
    return this.rateProductService.findOneById(id);
  }

  @Get('productId/:product_id')
  @ApiOperation({ summary: 'Lista o rate do produto de 0 a 5' })
  @Public()
  findOneByProductId(@Param('product_id') product_id: string) {
    return this.rateProductService.findOneByProductId(product_id);
  }

  @Get('productId/:product_id/comments')
  @ApiOperation({ summary: 'Lista todos os comentarios do product' })
  @Public()
  findAllByProduct(@Param('product_id') product_id: string) {
    return this.rateProductService.findAllByProduct(product_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) rate product' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateRateProductDto,
  ) {
    return this.rateProductService.updateById(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) rate product' })
  remove(@Param('id') id: string) {
    return this.rateProductService.deleteById(id);
  }
}

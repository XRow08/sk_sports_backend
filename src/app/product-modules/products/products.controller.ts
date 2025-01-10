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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductWBalanceDto } from './dto/create-product-balance.dto';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Products')
@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um produto' })
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.productsService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lista um unico produto pelo id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Lista um unico produto pelo slug' })
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @Get('name/:name')
  @Public()
  @ApiOperation({ summary: 'Lista um unico produto pelo nome' })
  findOneByName(@Param('name') name: string) {
    return this.productsService.findOneByName(name);
  }

  @Get('search/:search')
  @Public()
  @ApiOperation({ summary: 'Lista produtos pela pesquisa' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAllBySearch(
    @Param('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.productsService.findAllByTerm(search, pageNumber, limitNumber);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Atualiza um unico produto pelo id' })
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um unico produto pelo id' })
  remove(@Param('id') id: string) {
    return this.productsService.deleteById(id);
  }
}

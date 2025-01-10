import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product Tags')
@Controller('api/v1/product-tags')
export class ProductTagsController {
  constructor(private readonly productTagsService: ProductTagsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) product tags' })
  create(@Body() CreateTagDto: CreateProductTagDto) {
    return this.productTagsService.create(CreateTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) product tags' })
  findAll() {
    return this.productTagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) product tags' })
  findOne(@Param('id') id: string) {
    return this.productTagsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) product tags' })
  update(@Param('id') id: string, @Body() data: UpdateProductTagDto) {
    return this.productTagsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) product tags' })
  remove(@Param('id') id: string) {
    return this.productTagsService.deleteById(id);
  }
}

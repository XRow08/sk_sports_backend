import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria a categoria' })
  create(@Body() CreateCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createNew(CreateCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma unica categoria' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma unica categoria' })
  update(
    @Param('id') id: string,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateById(id, UpdateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma unica categoria' })
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteById(id);
  }
}

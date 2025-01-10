import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('api/v1/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) tags' })
  create(@Body() CreateTagDto: CreateTagDto) {
    return this.tagsService.create(CreateTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) tags' })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) tags' })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) tags' })
  update(@Param('id') id: string, @Body() data: UpdateTagDto) {
    return this.tagsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) tags' })
  remove(@Param('id') id: string) {
    return this.tagsService.deleteById(id);
  }
}

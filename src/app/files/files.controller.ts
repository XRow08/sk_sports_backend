import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('api/v1/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) files' })
  create(@Body() createProductBalanceDto: CreateFileDto) {
    return this.filesService.create(createProductBalanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos(as) files' })
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) files' })
  findOne(@Param('id') id: string) {
    return this.filesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) files' })
  update(
    @Param('id') id: string,
    @Body() updateProductBalanceDto: UpdateFileDto,
  ) {
    return this.filesService.updateById(id, updateProductBalanceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) files' })
  remove(@Param('id') id: string) {
    return this.filesService.deleteById(id);
  }
}

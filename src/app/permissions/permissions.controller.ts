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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Permissions')
@Controller('/api/v1/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria a permissao do usuario' })
  create(@Body() data: CreatePermissionDto) {
    return this.permissionsService.createNew(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as permissoes' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma unica permissao pelo id' })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma unica permissao pelo id' })
  update(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return this.permissionsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma unica permissao pelo id' })
  remove(@Param('id') id: string) {
    return this.permissionsService.deleteById(id);
  }
}

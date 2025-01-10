import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('api/v1/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria a notificacao do usuario' })
  create(@Body() data: CreateNotificationDto) {
    return this.notificationsService.createNew(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notificacoes' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Lista todas as notificacoes do usuario' })
  findAllByUserId(@Param('id') id: string) {
    return this.notificationsService.findAllByUserId(id);
  }

  @Get('customer/:id')
  @ApiOperation({ summary: 'Lista todas as notificacoes do customer' })
  findAllByCustomerId(@Param('id') id: string) {
    return this.notificationsService.findAllByCustomerId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma unica notificacao pelo id' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma unica notificacao pelo id' })
  update(
    @Param('id') id: string,
    @Body() CreateNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.updateById(id, CreateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma unica notificacao pelo id' })
  remove(@Param('id') id: string) {
    return this.notificationsService.deleteById(id);
  }
}

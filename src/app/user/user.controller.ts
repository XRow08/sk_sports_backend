import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from 'src/middlewares/PublicMiddleware';
import { ResetPassDto, ResetPassReqDto } from './dto/resetPassReqDto.dto';

@SkipThrottle()
@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um usuario' })
  @ApiResponse({
    status: 201,
    description: 'Cria um usuario',
  })
  async createNew(@Body() body: CreateUserDto) {
    return this.userService.createNew(body);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.userService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Puxa informacoes de um unico usuario' })
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('reset/validate/:email')
  @Public()
  @ApiOperation({ summary: 'Valida o codigo do usuario' })
  async validateCode(
    @Param('email') email: string,
    @Body() body: ResetPassDto,
  ) {
    return await this.userService.validateCode({ email, code: body.code });
  }

  @Patch('reset/password/:email')
  @Public()
  @ApiOperation({ summary: 'Reseta a senha do usuario' })
  async resetPassword(
    @Param('email') email: string,
    @Body() body: ResetPassDto,
  ) {
    return await this.userService.resetPassword({ ...body, email });
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Atualiza informacoes de um unico usuario' })
  @ApiResponse({
    status: 201,
    description: 'Atualiza informacoes de um unico usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Cria um usuario',
  })
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateById(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um unico usuario' })
  async deleteById(@Param('id') id: string) {
    await this.userService.deleteById(id);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/middlewares/PublicMiddleware';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login de usuario' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('password-reset')
  @Public()
  @ApiOperation({ summary: 'Envia o email para reset da senha' })
  getToken(@Body() body: ResetPasswordDto) {
    return this.authService.sendPasswordResetEmail(body.email);
  }
}

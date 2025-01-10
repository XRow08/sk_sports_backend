import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStragey } from './strategy/local.strategy';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStragey,
    JwtStrategy,
    PrismaService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

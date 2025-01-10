import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsUnique } from 'src/validators/IsUnique.validator';
import { PrismaService } from 'src/database/prisma.service';
import { JwtStrategy } from 'src/app/auth/strategy/jwt.strategy';
import { UploadModule } from 'src/app/upload/upload.module';

@Module({
  controllers: [UserController],
  imports: [UploadModule],
  providers: [UserService, IsUnique, PrismaService, JwtStrategy],
  exports: [UserService, IsUnique],
})
export class UserModule {}

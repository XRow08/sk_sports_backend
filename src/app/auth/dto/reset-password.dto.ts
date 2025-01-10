import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Preencha o email' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  email: string;
}

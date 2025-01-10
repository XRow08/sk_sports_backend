import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { MaxLength, IsOptional, IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail(undefined, { message: 'Informe um e-mail válido' })
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  email: string;
}

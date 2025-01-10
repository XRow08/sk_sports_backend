import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, Validate } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';
import { IsUnique } from 'src/validators/IsUnique.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Preencha o first_name' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  first_name: string;

  @IsNotEmpty({ message: 'Preencha o last_name' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  last_name: string;

  @IsEmail(undefined, { message: 'Informe um e-mail válido' })
  @IsNotEmpty({ message: 'Preencha o email' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  @Validate(IsUnique, ['User', 'email'])
  email: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  @Exists('address', 'id', { message: 'O address_id fornecido não existe.' })
  address_id: string;

  @IsOptional()
  @ApiHideProperty()
  security_code: string;

  @IsNotEmpty({ message: 'Preencha a senha' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  password: string;
}

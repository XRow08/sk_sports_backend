import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateNotificationDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('user', 'id', { message: 'O user_id fornecido não existe.' })
  user_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('customer', 'id', { message: 'O customer_id fornecido não existe.' })
  customer_id: string;

  @IsNotEmpty({ message: 'Preencha o titulo' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  name: string;

  @ApiPropertyOptional()
  status: number;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  description: string;
}

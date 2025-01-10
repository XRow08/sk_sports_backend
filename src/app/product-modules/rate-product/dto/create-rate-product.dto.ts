import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateRateProductDto {
  @IsNotEmpty({ message: 'Preencha o rate' })
  @ApiProperty()
  rate: number;

  @IsOptional()
  @ApiPropertyOptional()
  likes: number;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  @Exists('user', 'id', { message: 'O user_id fornecido não existe.' })
  user_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  images: string[];

  @IsOptional()
  @ApiPropertyOptional()
  title: string;

  @IsOptional()
  @ApiPropertyOptional()
  comment: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateProductImageDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('file', 'id', { message: 'O file_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  file_id: string;
}

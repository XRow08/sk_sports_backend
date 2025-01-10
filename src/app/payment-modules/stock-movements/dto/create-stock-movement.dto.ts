import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateStockMovementDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('shop', 'id', { message: 'O shop_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  shop_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('customer', 'id', { message: 'O customer_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  customer_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  quantity: number;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  moviment_type: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  document_ref: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  observations: string;
}

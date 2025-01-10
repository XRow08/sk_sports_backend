import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateProductBalanceDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('shop', 'id', { message: 'O shop_id fornecido não existe.' })
  shop_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  balance_min: number;

  @IsOptional()
  @ApiPropertyOptional()
  balance: number;
}

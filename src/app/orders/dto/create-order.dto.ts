import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateOrderDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('customer', 'id', { message: 'O customer_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  customer_id: string;

  @IsOptional()
  @Exists('seller', 'id', { message: 'O seller_id fornecido não existe.' })
  @ApiPropertyOptional()
  seller_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('shop', 'id', { message: 'O shop_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  shop_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('origin', 'id', { message: 'O origin_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  origin_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('paymentMethod', 'id', {
    message: 'O payment_method_id fornecido não existe.',
  })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  payment_method_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  status: string;

  @IsOptional()
  @ApiPropertyOptional()
  addition: number;

  @IsOptional()
  @ApiPropertyOptional()
  descount: number;

  @IsOptional()
  @ApiPropertyOptional()
  portage: number;

  @ApiHideProperty()
  @IsOptional()
  total_price: number;
}

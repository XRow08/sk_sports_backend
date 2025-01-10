import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateOrdersItemDto {
  @IsNotEmpty({ message: 'Preencha o order_id' })
  @ApiProperty()
  @Exists('order', 'id', { message: 'O order_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  order_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  quantity: number;
}

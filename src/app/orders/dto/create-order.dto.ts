import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  user_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  status: string;

  @IsOptional()
  @ApiPropertyOptional()
  addition: number;

  @IsOptional()
  @ApiPropertyOptional()
  discount: number;

  @IsOptional()
  @ApiPropertyOptional()
  portage: number;

  @ApiHideProperty()
  @IsOptional()
  total_price: number;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

class Customer {
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsEmail({}, { message: 'Email invalido!' })
  email: string;

  @IsOptional()
  @ApiPropertyOptional()
  cpf: string;
}

class ItemsOrder {
  @IsOptional()
  @ApiPropertyOptional()
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  quantity: number;

  @IsOptional()
  @ApiPropertyOptional()
  price: number;
}

export class CreateAppmaxDto {
  @IsOptional()
  @ApiPropertyOptional()
  customer: Customer;

  @IsOptional()
  @ApiPropertyOptional()
  items: ItemsOrder[];

  @IsOptional()
  @ApiPropertyOptional()
  order_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  document_number: string;

  @IsOptional()
  @ApiPropertyOptional()
  paymentMethod: string;

  @IsOptional()
  @ApiPropertyOptional()
  expiration_date: string;

  @IsOptional()
  @ApiPropertyOptional()
  token: string;

  @IsOptional()
  @ApiPropertyOptional()
  installments: number;
}

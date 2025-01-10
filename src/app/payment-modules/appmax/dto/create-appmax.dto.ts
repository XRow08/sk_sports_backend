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
  items: ItemsOrder;

  @IsOptional()
  @ApiPropertyOptional()
  paymentMethod: string;

  @IsOptional()
  @ApiPropertyOptional()
  number: number;

  @IsOptional()
  @ApiPropertyOptional()
  expiration_date: string;

  @IsOptional()
  @ApiPropertyOptional()
  cvv: string;

  @IsOptional()
  @ApiPropertyOptional()
  holder_name: string;
}

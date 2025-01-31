import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

class Customer {
  @IsOptional()
  @ApiPropertyOptional()
  @IsEmail({}, { message: 'Email invalido!' })
  email: string;

  @IsOptional()
  @ApiPropertyOptional()
  cpf: string;

  @IsOptional()
  @ApiPropertyOptional()
  phone: string;
}

export class CreateAppmaxDto {
  @IsOptional()
  @ApiPropertyOptional()
  customer: Customer;

  @IsOptional()
  @ApiPropertyOptional()
  order_id: string;

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

  @IsOptional()
  @ApiPropertyOptional()
  cvv: string;
}

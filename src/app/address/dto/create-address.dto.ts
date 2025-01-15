import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsOptional()
  @ApiPropertyOptional()
  city: string;

  @IsOptional()
  @ApiPropertyOptional()
  complement: string;

  @IsOptional()
  @ApiPropertyOptional()
  state: string;
  
  @IsOptional()
  @ApiPropertyOptional()
  district: string

  @IsOptional()
  @ApiPropertyOptional()
  cep: string;

  @IsOptional()
  @ApiPropertyOptional()
  number: string;
}

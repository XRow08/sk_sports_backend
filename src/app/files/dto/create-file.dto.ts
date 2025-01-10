import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  @ApiPropertyOptional()
  url: string;
}

import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class UploadImageDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  product_id: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

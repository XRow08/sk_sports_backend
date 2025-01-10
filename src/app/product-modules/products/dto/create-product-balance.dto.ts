import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateProductWBalanceDto {
  @IsNotEmpty({ message: 'Preencha o name' })
  @ApiProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  description: string;

  @IsOptional()
  @ApiHideProperty()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  slug: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsPositive({ message: 'O preço deve ser um número positivo' })
  price: number;

  @IsOptional()
  @ApiPropertyOptional({
    default: 'https://api.mit-tech.com.br/img/produto-sem-imagem.png',
    required: false,
  })
  @IsUrl({}, { message: 'O campo image_url deve conter uma URL válida' })
  image_url?: string;

  @IsOptional()
  @ApiPropertyOptional()
  cor: string;

  @IsOptional()
  @ApiPropertyOptional()
  balance_min: number;

  @IsOptional()
  @ApiPropertyOptional()
  balance: number;
}

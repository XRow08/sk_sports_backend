import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Exists } from 'src/validators/Exists.validator';

export class CreateProductDto {
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
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  indicate_for: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  sleeve: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  composition: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  collar: string;

  @IsOptional()
  @ApiPropertyOptional()
  discount: number;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  tech: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  club: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsPositive({ message: 'O preço deve ser um número positivo' })
  price: number;

  @IsOptional()
  @ApiPropertyOptional()
  gender: string;

  @IsOptional()
  @ApiPropertyOptional()
  size: string[];

  @IsOptional()
  @ApiPropertyOptional()
  categories: string[];

  @IsOptional()
  @ApiPropertyOptional()
  image_url: string;

  @IsOptional()
  @ApiPropertyOptional()
  cor: string;
}

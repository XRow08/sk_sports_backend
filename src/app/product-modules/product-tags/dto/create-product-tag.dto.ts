import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";
import { Exists } from "src/validators/Exists.validator";

export class CreateProductTagDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Exists('product', 'id', { message: 'O product_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  product_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exists('tag', 'id', { message: 'O tag_id fornecido não existe.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres ' })
  tag_id: string;
}

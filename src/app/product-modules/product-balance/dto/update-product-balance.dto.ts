import { PartialType } from '@nestjs/swagger';
import { CreateProductBalanceDto } from './create-product-balance.dto';

export class UpdateProductBalanceDto extends PartialType(CreateProductBalanceDto) {}

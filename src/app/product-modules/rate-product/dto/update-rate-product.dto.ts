import { PartialType } from '@nestjs/swagger';
import { CreateRateProductDto } from './create-rate-product.dto';

export class UpdateRateProductDto extends PartialType(CreateRateProductDto) {}

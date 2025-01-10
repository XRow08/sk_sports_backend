import { PartialType } from '@nestjs/swagger';
import { CreateOrdersItemDto } from './create-orders-item.dto';

export class UpdateOrdersItemDto extends PartialType(CreateOrdersItemDto) {}

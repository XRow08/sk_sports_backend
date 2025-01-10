import { PartialType } from '@nestjs/swagger';
import { CreateTrafficDto } from './create-traffic.dto';

export class UpdateTrafficDto extends PartialType(CreateTrafficDto) {}

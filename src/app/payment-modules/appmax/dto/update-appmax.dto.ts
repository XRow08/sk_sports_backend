import { PartialType } from '@nestjs/swagger';
import { CreateAppmaxDto } from './create-appmax.dto';

export class UpdateAppmaxDto extends PartialType(CreateAppmaxDto) {}

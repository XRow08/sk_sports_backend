import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty({ message: 'Preencha o name' })
  @ApiProperty()
  name: string;
}

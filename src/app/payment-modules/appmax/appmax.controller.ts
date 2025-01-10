import { Controller, Post, Body } from '@nestjs/common';
import { AppmaxService } from './appmax.service';
import { CreateAppmaxDto } from './dto/create-appmax.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('AppMax')
@Controller('/api/v1/appmax')
export class AppmaxController {
  constructor(private readonly appmaxService: AppmaxService) {}

  @Post('payment')
  @Public()
  @ApiOperation({ summary: 'Gera o pagamento da order' })
  async createPayment(@Body() data: CreateAppmaxDto) {
    return this.appmaxService.createPayment(data);
  }
}

import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AppmaxService } from './appmax.service';
import { CreateAppmaxDto } from './dto/create-appmax.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/PublicMiddleware';
import { Request } from 'express';

@ApiTags('AppMax')
@Controller('/api/v1/appmax')
export class AppmaxController {
  constructor(private readonly appmaxService: AppmaxService) {}

  @Post('payment')
  @Public()
  @ApiOperation({ summary: 'Gera o pagamento da order' })
  async createPayment(@Body() data: CreateAppmaxDto, @Req() request: Request) {
    const forwardedFor = request.headers['x-forwarded-for'];
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor || request.ip;
    return this.appmaxService.createPayment(data, clientIp);
  }

  @Get('webhook')
  @Public()
  async handleWebhook(@Body() payload: any) {
    console.log(payload);
    return this.appmaxService.handleWebhook(payload);
  }
}

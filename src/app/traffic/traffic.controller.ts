import { Controller, Get, Post, Req } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Traffic')
@Controller('api/v1/traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um(a) trafico' })
  create(@Req() request: Request) {
    const forwardedFor = request.headers['x-forwarded-for'];
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor || request.ip;
    return this.trafficService.createOne(clientIp);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os traficos' })
  findAll() {
    return this.trafficService.findAll();
  }

  @Get('ip')
  @ApiOperation({ summary: 'Lista um(a) trafico pelo IP' })
  findOneByIp(@Req() request: Request) {
    const forwardedFor = request.headers['x-forwarded-for'];
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor || request.ip;
    return this.trafficService.findOneByIp(clientIp);
  }
}

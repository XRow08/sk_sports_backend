import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { TrafficService } from './traffic.service';

@Injectable()
export class TrafficMiddleware implements NestMiddleware {
  constructor(private readonly trafficService: TrafficService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.ip;
    await this.trafficService.createOne(ipAddress);
    next();
  }
}

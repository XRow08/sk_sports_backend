import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as UAParser from 'ua-parser-js';

@Injectable()
export class DeviceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];
    const parser = new (UAParser as any)(userAgent);
    const deviceInfo = parser.getResult();
    req['deviceInfo'] = deviceInfo;
    next();
  }
}

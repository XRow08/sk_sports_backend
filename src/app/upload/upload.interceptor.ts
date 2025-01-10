import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';

@Injectable()
export class ImageCompressionInterceptor implements NestInterceptor {
  constructor(private readonly uploadService: UploadService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (req.file) {
      const file = req.file;
      const buffer = await this.uploadService.getFileBuffer(file.path);
      file.buffer = buffer;
    }
    return next.handle();
  }
}

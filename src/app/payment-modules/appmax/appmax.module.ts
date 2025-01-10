import { Module } from '@nestjs/common';
import { AppmaxService } from './appmax.service';
import { AppmaxController } from './appmax.controller';

@Module({
  controllers: [AppmaxController],
  providers: [AppmaxService]
})
export class AppmaxModule {}

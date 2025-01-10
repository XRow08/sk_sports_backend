import { Controller, Get, Param } from '@nestjs/common';
import { CepService } from './cep.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cep')
@Controller('/api/v1/cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  getCepData(@Param('cep') cep: string) {
    return this.cepService.getCepData(cep);
  }
}

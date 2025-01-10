import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CepService {
  async getCepData(cep: string): Promise<any> {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        throw new HttpException('CEP not found', HttpStatus.NOT_FOUND);
      }
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Unable to fetch CEP data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

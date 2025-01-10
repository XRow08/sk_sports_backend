import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAppmaxDto } from './dto/create-appmax.dto';
import axios from 'axios';

@Injectable()
export class AppmaxService {
  private readonly apiBaseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiBaseUrl = "https://homolog.sandboxappmax.com.br/api/v3";
    this.apiKey = process.env.APPMAX_API_KEY;
  }

  async createPayment(payload: CreateAppmaxDto) {
    const paymentPayload = await this.buildPaymentPayload(payload);

    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/order`,
        paymentPayload,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async buildPaymentPayload(payload: CreateAppmaxDto) {
    const { paymentMethod, ...orderData } = payload;
    switch (paymentMethod) {
      case 'pix':
        return { ...orderData, payment: { method: 'pix' } };
      case 'credit_card':
        return {
          ...orderData,
          payment: {
            method: 'credit_card',
            card: {
              number: orderData.number,
              expiration_date: orderData.expiration_date,
              cvv: orderData.cvv,
              holder_name: orderData.holder_name,
            },
          },
        };
      case 'boleto':
        return { ...orderData, payment: { method: 'boleto' } };
      default:
        throw new BadRequestException('Invalid payment method');
    }
  }
}

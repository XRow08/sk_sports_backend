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
    this.apiBaseUrl = 'https://admin.appmax.com.br/api/v3';
    this.apiKey = process.env.APPMAX_API_KEY;
  }

  async createOrder(payload: CreateAppmaxDto) {
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
    switch (payload.paymentMethod) {
      case 'pix':
        return {
          'access-token': this.apiKey,
          cart: {
            order_id: payload.order_id,
          },
          customer: {
            customer_id: 22,
          },
          payment: {
            pix: {
              document_number: payload.customer.cpf,
              expiration_date: payload.expiration_date,
            },
          },
        };
      case 'card':
        return {
          'access-token': this.apiKey,
          cart: {
            order_id: payload.order_id,
          },
          customer: {
            customer_id: 22,
          },
          payment: {
            CreditCard: {
              token: payload.token,
              document_number: payload.customer.cpf,
              installments: payload.installments,
              soft_descriptor: 'SK SPORTS',
            },
          },
        };
      case 'boleto':
        return {
          'access-token': this.apiKey,
          cart: {
            order_id: payload.order_id,
          },
          customer: {
            customer_id: 22,
          },
          payment: {
            Boleto: {
              document_number: payload.customer.cpf,
            },
          },
        };
      default:
        throw new BadRequestException('Invalid payment method');
    }
  }
}

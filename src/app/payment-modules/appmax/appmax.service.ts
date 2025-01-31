import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppmaxDto } from './dto/create-appmax.dto';
import axios from 'axios';
import { UserService } from 'src/app/user/user.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { OrdersItemsService } from 'src/app/orders-items/orders-items.service';

@Injectable()
export class AppmaxService {
  private readonly apiBaseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly userService: UserService,
    private readonly ordersService: OrdersService,
    private readonly ordersItemsService: OrdersItemsService,
  ) {
    this.apiBaseUrl = 'https://admin.appmax.com.br/api/v3';
    this.apiKey = process.env.APPMAX_API_KEY;
  }

  async createPayment(payload: CreateAppmaxDto, ip: string) {
    const cus_id = await this.createCustomer(payload, ip);
    const order_id = await this.createOrder(payload, cus_id);
    const data = await this.buildPaymentPayload(payload, cus_id, order_id);
    try {
      const url = `${this.apiBaseUrl}/payment/${payload.paymentMethod}`;
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async createCustomer(payload: CreateAppmaxDto, ip: string) {
    const user = await this.userService.findByEmail(payload.customer.email);

    const data = {
      'access-token': this.apiKey,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      telephone: payload.customer.phone,
      postcode: user.address.cep,
      address_street: user.address.address,
      address_street_number: user.address.number,
      address_street_complement: user.address.complement,
      address_street_district: user.address.district,
      address_city: user.address.city,
      address_state: user.address.state,
      ip,
    };

    try {
      const response = await axios.post(`${this.apiBaseUrl}/customer`, data);
      return response.data.data.id;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async createOrder(payload: CreateAppmaxDto, customer_id: string) {
    const order = await this.ordersService.findOneById(payload.order_id);
    const items = await this.ordersItemsService.findAllByOrderId(order.id);
    const products = items.map((e) => {
      return { sku: e.product.id, name: e.product.name, qty: e.quantity };
    });
    let total = order.total_price;
    if (payload.paymentMethod === 'pix') {
      total = items.reduce((acc, item) => {
        const itemPrice = item.each_price * (1 - item.product.discount / 100);
        const itemTotalPrice = itemPrice * item.quantity;
        return acc + itemTotalPrice;
      }, 0);
      total += order.portage;
    }
    const data = {
      'access-token': this.apiKey,
      total,
      products,
      customer_id,
      shipping: order.portage,
      discount: order.discount,
    };
    try {
      const response = await axios.post(`${this.apiBaseUrl}/order`, data);
      return response.data.data.id;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async getYMDHIS() {
    const now = new Date();
    const date = new Date(now.getTime() + 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  async buildPaymentPayload(
    payload: CreateAppmaxDto,
    customer_id: number,
    order_id: number,
  ) {
    switch (payload.paymentMethod) {
      case 'pix':
        const expiration = await this.getYMDHIS();
        return {
          'access-token': this.apiKey,
          cart: { order_id },
          customer: { customer_id },
          payment: {
            pix: {
              document_number: payload.customer.cpf,
              expiration_date: expiration,
            },
          },
        };
      case 'credit-card':
        return {
          'access-token': this.apiKey,
          cart: { order_id },
          customer: { customer_id },
          payment: {
            CreditCard: {
              token: payload.token,
              cvv: payload.cvv,
              document_number: payload.customer.cpf,
              installments: payload.installments,
              soft_descriptor: 'SK SPORTS',
            },
          },
        };
      default:
        throw new BadRequestException('Invalid payment method');
    }
  }

  async handleWebhook(payload: any) {
    console.log(payload);
    if (payload['access-token'] !== this.apiKey) {
      throw new BadRequestException('Invalid access token');
    }

    const paymentType = payload.data?.payment_method?.toLowerCase();
    const status = payload.data?.status?.toLowerCase();
    const orderId = payload.data?.order_id;

    if (!paymentType || !status || !orderId) {
      throw new BadRequestException('Invalid webhook payload');
    }

    switch (paymentType) {
      case 'pix':
        return this.handlePixWebhook(status, orderId);
      case 'credit-card':
        return this.handleCreditCardWebhook(status, orderId);
      default:
        throw new BadRequestException('Unsupported payment type');
    }
  }

  private async handlePixWebhook(status: string, orderId: string) {
    switch (status) {
      case 'paid':
        await this.ordersService.updateById(orderId, { status: 'aprovado' });
        break;
      case 'canceled':
        await this.ordersService.updateById(orderId, { status: 'cancelled' });
        break;
      case 'waiting_payment':
        await this.ordersService.updateById(orderId, { status: 'pending' });
        break;
      default:
        throw new BadRequestException('Invalid PIX status');
    }

    return { success: true };
  }

  private async handleCreditCardWebhook(status: string, orderId: string) {
    switch (status) {
      case 'paid':
        await this.ordersService.updateById(orderId, { status: 'paid' });
        break;
      case 'canceled':
      case 'chargeback':
        await this.ordersService.updateById(orderId, { status: 'cancelled' });
        break;
      case 'waiting_payment':
      case 'under_analysis':
        await this.ordersService.updateById(orderId, { status: 'pending' });
        break;
      case 'refused':
        await this.ordersService.updateById(orderId, { status: 'failed' });
        break;
      default:
        throw new BadRequestException('Invalid credit card status');
    }

    return { success: true };
  }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly baseUrl = 'https://api-m.paypal.com';

  constructor(private readonly httpService: HttpService) {}

  private async getAccessToken(): Promise<string> {

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;
    const credentials = Buffer.from(`${clientId}:${secret}`).toString('base64');

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    return data.access_token;
  }

  async createOrder(amount: string, currency: string) {
    const token = await this.getAccessToken();

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency || 'USD',
                value: amount,
              },
            },
          ],
          application_context: {
            return_url: `${process.env.APP_URL}/payment/success`,
            cancel_url: `${process.env.APP_URL}/payment/cancel`,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );

    const approvalUrl = data.links.find((l: any) => l.rel === 'approve')?.href;
    return { orderId: data.id, approvalUrl };
  }

  async getOrder(orderId: string) {
    const token = await this.getAccessToken();
  
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/v2/checkout/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
  
    return data;
  }

  async captureOrder(orderId: string) {
    const token = await this.getAccessToken();

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );

    return data;
  }
}
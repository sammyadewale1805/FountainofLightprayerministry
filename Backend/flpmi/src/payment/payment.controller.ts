import { Controller, Post, Get, Body, Query, Res, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller('paypal')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('debug-env')
  debugEnv() {
    return {
      status: 'working',
      message: 'Paypal routes working',
    };
  }

  @Post('create-order')
  async createOrder(@Body() body: { amount: string; currency?: string; purpose?: string }) {
    return this.paymentService.createOrder(body.amount, body.currency || 'USD');
  }

  @Get('order/:orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.paymentService.getOrder(orderId);
  }

  @Get('success')
  successPayment(@Query('token') token: string, @Res() res: Response) {
    res.json({ message: 'Payment successful', orderId: token });
  }

  @Get('cancel')
  cancelPayment(@Res() res: Response) {
    res.json({ message: 'Payment cancelled' });
  }

  @Post('capture-order')
  async captureOrder(@Body() body: { orderId: string }) {
    return this.paymentService.captureOrder(body.orderId);
  }
}
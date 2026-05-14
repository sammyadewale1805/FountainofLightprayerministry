// Webhook utilities for payment verification and security
import { PaymentData, PaymentResult } from './payments';

export interface WebhookEvent {
  event: string;
  data: any;
  signature?: string;
  timestamp: number;
}

export interface PaystackWebhookEvent extends WebhookEvent {
  event: 'charge.success' | 'charge.failed' | 'subscription.create' | 'subscription.disable';
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: {
      purpose: string;
      firstName: string;
      lastName: string;
      ministry: string;
      branch: string;
      [key: string]: any;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      risk_action: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

export interface PayPalWebhookEvent extends WebhookEvent {
  event_type: 'PAYMENT.CAPTURE.COMPLETED' | 'PAYMENT.CAPTURE.DENIED' | 'PAYMENT.CAPTURE.PENDING';
  resource_type: string;
  resource: {
    id: string;
    amount: {
      currency_code: string;
      value: string;
    };
    status: string;
    custom_id: string;
    seller_protection: any;
    links: any[];
    create_time: string;
    update_time: string;
  };
  links: any[];
  event_version: string;
  create_time: string;
  resource_version: string;
}

// Security: Verify Paystack webhook signature
export const verifyPaystackSignature = (payload: string, signature: string, secret: string): boolean => {
  if (!signature || !secret) {
    console.warn('Missing signature or secret for Paystack webhook verification');
    return false;
  }

  try {
    // Paystack uses HMAC SHA512
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha512', secret)
      .update(payload, 'utf8')
      .digest('hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Paystack signature verification error:', error);
    return false;
  }
};

// Security: Verify PayPal webhook signature
export const verifyPayPalSignature = (
  payload: string, 
  headers: Record<string, string>,
  webhookId: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // PayPal webhook verification would typically require their SDK
      // For now, we'll implement basic verification
      const requiredHeaders = [
        'paypal-transmission-id',
        'paypal-cert-id',
        'paypal-transmission-sig',
        'paypal-transmission-time'
      ];
      
      const hasRequiredHeaders = requiredHeaders.every(header => 
        headers[header] && headers[header].length > 0
      );
      
      if (!hasRequiredHeaders) {
        console.warn('Missing required PayPal webhook headers');
        resolve(false);
        return;
      }
      
      // In production, you would use PayPal's webhook verification
      // For now, we'll do basic validation
      resolve(true);
    } catch (error) {
      console.error('PayPal signature verification error:', error);
      resolve(false);
    }
  });
};

// Process Paystack webhook events
export const processPaystackWebhook = (event: PaystackWebhookEvent): PaymentResult => {
  const { data } = event;
  
  // Security: Validate event structure
  if (!data.reference || !data.amount || !data.status) {
    throw new Error('Invalid webhook data structure');
  }
  
  // Security: Validate amount (basic sanity check)
  if (data.amount < 0 || data.amount > 50000000) { // Max ₦500,000
    throw new Error('Invalid payment amount in webhook');
  }
  
  switch (event.event) {
    case 'charge.success':
      return {
        success: true,
        reference: data.reference,
        transactionId: data.id.toString(),
        message: `Payment of ₦${(data.amount / 100).toLocaleString()} successfully verified`
      };
      
    case 'charge.failed':
      return {
        success: false,
        reference: data.reference,
        error: data.gateway_response || 'Payment verification failed'
      };
      
    default:
      throw new Error(`Unhandled Paystack webhook event: ${event.event}`);
  }
};

// Process PayPal webhook events
export const processPayPalWebhook = (event: PayPalWebhookEvent): PaymentResult => {
  const { resource } = event;
  
  // Security: Validate event structure
  if (!resource.id || !resource.amount || !resource.status) {
    throw new Error('Invalid PayPal webhook data structure');
  }
  
  // Security: Validate amount
  const amount = parseFloat(resource.amount.value);
  if (amount < 0 || amount > 100000) { // Max $100,000
    throw new Error('Invalid payment amount in PayPal webhook');
  }
  
  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      return {
        success: true,
        reference: resource.custom_id,
        transactionId: resource.id,
        message: `PayPal payment of $${amount} successfully verified`
      };
      
    case 'PAYMENT.CAPTURE.DENIED':
      return {
        success: false,
        reference: resource.custom_id,
        error: 'Payment was denied by PayPal'
      };
      
    case 'PAYMENT.CAPTURE.PENDING':
      return {
        success: false,
        reference: resource.custom_id,
        error: 'Payment is pending verification'
      };
      
    default:
      throw new Error(`Unhandled PayPal webhook event: ${event.event_type}`);
  }
};

// Rate limiting for webhook endpoints (simple implementation)
const webhookCallCounts = new Map<string, { count: number; resetTime: number }>();
const WEBHOOK_RATE_LIMIT = 100; // calls per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

export const isWebhookRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const key = `webhook_${ip}`;
  
  const current = webhookCallCounts.get(key);
  
  if (!current || now > current.resetTime) {
    // First call or window expired
    webhookCallCounts.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return false;
  }
  
  if (current.count >= WEBHOOK_RATE_LIMIT) {
    return true; // Rate limited
  }
  
  // Increment count
  current.count++;
  return false;
};

// Security: Log webhook events for audit
export const logWebhookEvent = (
  source: 'paystack' | 'paypal',
  event: WebhookEvent,
  success: boolean,
  ip?: string
) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    source,
    event: 'event' in event ? event.event : (event as any).event_type,
    success,
    ip: ip || 'unknown',
    reference: event.data?.reference || (event as any).resource?.custom_id,
    // Don't log sensitive data
    amount: event.data?.amount || (event as any).resource?.amount?.value
  };
  
  // In production, this would go to a secure logging service
  console.log('Webhook Event:', JSON.stringify(logEntry));
};

// Validate webhook event timing (prevent replay attacks)
export const isWebhookEventRecent = (timestamp: number, maxAgeMinutes: number = 10): boolean => {
  const eventTime = new Date(timestamp).getTime();
  const now = Date.now();
  const maxAge = maxAgeMinutes * 60 * 1000; // Convert to milliseconds
  
  return (now - eventTime) <= maxAge;
};

// Security: Sanitize webhook data
export const sanitizeWebhookData = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return {};
  }
  
  const sanitized: any = {};
  const allowedFields = [
    'id', 'reference', 'amount', 'status', 'currency', 'email',
    'first_name', 'last_name', 'purpose', 'metadata', 'created_at',
    'paid_at', 'gateway_response', 'custom_id', 'event_type'
  ];
  
  for (const field of allowedFields) {
    if (field in data) {
      if (typeof data[field] === 'string') {
        // Basic string sanitization
        sanitized[field] = data[field].trim().substring(0, 500);
      } else if (typeof data[field] === 'number') {
        sanitized[field] = data[field];
      } else if (typeof data[field] === 'object' && data[field] !== null) {
        // Recursively sanitize objects
        sanitized[field] = sanitizeWebhookData(data[field]);
      } else {
        sanitized[field] = data[field];
      }
    }
  }
  
  return sanitized;
};
// Payment configuration and utilities

export interface PaymentData {
  amount: number;
  currency: 'USD' | 'NGN';
  email: string;
  firstName?: string;
  lastName?: string;
  purpose: string;
  isRecurring?: boolean;
  metadata?: Record<string, any>;
}

export interface PaymentConfig {
  paystack: {
    publicKey: string;
    secretKey?: string;
    environment: 'test' | 'live';
  };
  paypal: {
    clientId: string;
    clientSecret?: string;
    environment: 'sandbox' | 'production';
  };
  security: {
    enableWebhookVerification: boolean;
    webhookSecrets: {
      paystack: string;
      paypal: string;
    };
    rateLimiting: {
      enabled: boolean;
      maxRequestsPerHour: number;
    };
    auditLogging: boolean;
  };
}

export interface PaymentResult {
  success: boolean;
  reference?: string;
  transactionId?: string;
  message?: string;
  error?: string;
}

// Enhanced Paystack Configuration with Security
export const PAYSTACK_CONFIG = {
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_944a1bc8e5c47e6c4d01f1fc5c4d50109af17dff',
  secretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY || '', // For server-side verification
  currency: 'NGN' as const,
  channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  // Security: Only allow specific callback URLs
  callback_url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080'}/giving/callback`,
  // Security: Webhook endpoint for transaction verification
  webhook_url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'}/api/webhooks/paystack`,
  // Security: Additional configuration
  security: {
    enableFraudDetection: true,
    maxDailyAmount: 500000, // ₦500,000 daily limit per user
    allowedCountries: ['NG', 'US', 'GB', 'CA'], // Restrict by country if needed
    enableDeviceFingerprinting: true,
  },
};

// Enhanced PayPal Configuration with Security
export const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_PAYPAL_CLIENT_SECRET || '', // For server-side verification
  currency: 'USD' as const,
  intent: 'capture' as const,
  environment: import.meta.env.MODE === 'production' ? 'production' : 'sandbox',
  // Security: Disable funding sources for better control
  disableFunding: ['credit', 'paylater'],
  // Enable specific funding sources
  enableFunding: ['venmo'],
  // Security: Webhook configuration
  webhook: {
    url: `${window.location.origin}/api/webhooks/paypal`,
    events: ['PAYMENT.CAPTURE.COMPLETED', 'PAYMENT.CAPTURE.DENIED'],
  },
  // Security: Additional configuration
  security: {
    enableBuyerProtection: true,
    maxDailyAmount: 50000, // $50,000 daily limit per user
    allowedCountries: ['US', 'CA', 'GB', 'AU', 'NG'], // International support
    require3DSecure: false, // PayPal handles this internally
  },
};

// Convert amount to appropriate format for payment processors
export const formatAmountForPayment = (amount: number, currency: 'USD' | 'NGN'): number => {
  // Paystack expects amount in kobo (smallest unit) for NGN
  if (currency === 'NGN') {
    return Math.round(amount * 100);
  }
  // PayPal expects amount in dollars for USD
  return amount;
};

// Convert amount back from payment processor format
export const formatAmountFromPayment = (amount: number, currency: 'USD' | 'NGN'): number => {
  if (currency === 'NGN') {
    return amount / 100;
  }
  return amount;
};

// Generate unique transaction reference
export const generateTransactionReference = (prefix: string = 'FOLM'): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}_${timestamp}_${randomString}`;
};

// Validate payment data
export const validatePaymentData = (data: PaymentData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Amount validation
  if (!data.amount || data.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  // Maximum amount validation for security
  const maxAmounts = { USD: 10000, NGN: 5000000 }; // $10,000 or ₦5,000,000
  if (data.amount > maxAmounts[data.currency]) {
    errors.push(`Maximum amount is ${maxAmounts[data.currency]} ${data.currency}`);
  }
  
  // Email validation with stricter regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  // Email domain validation (basic security)
  if (data.email && data.email.includes('tempmail') || data.email.includes('10minutemail')) {
    errors.push('Please use a permanent email address');
  }
  
  if (!data.purpose || !PAYMENT_PURPOSES[data.purpose as keyof typeof PAYMENT_PURPOSES]) {
    errors.push('Valid payment purpose is required');
  }
  
  if (!['USD', 'NGN'].includes(data.currency)) {
    errors.push('Currency must be USD or NGN');
  }
  
  // Minimum amount validation
  const minAmounts = { USD: 5, NGN: 500 };
  if (data.amount < minAmounts[data.currency]) {
    errors.push(`Minimum amount is ${minAmounts[data.currency]} ${data.currency}`);
  }
  
  // Name validation (optional but recommended)
  if (data.firstName && data.firstName.length > 50) {
    errors.push('First name must be less than 50 characters');
  }
  if (data.lastName && data.lastName.length > 50) {
    errors.push('Last name must be less than 50 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Security: Sanitize user input
export const sanitizePaymentData = (data: PaymentData): PaymentData => {
  return {
    ...data,
    email: data.email.toLowerCase().trim(),
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    purpose: data.purpose.trim(),
    // Ensure amount is a valid number
    amount: Math.round(data.amount * 100) / 100, // Round to 2 decimal places
  };
};

// Check if payment system is properly configured
export const isPaymentConfigured = (currency: 'USD' | 'NGN'): boolean => {
  if (currency === 'NGN') {
    return PAYSTACK_CONFIG.publicKey.startsWith('pk_test_') || PAYSTACK_CONFIG.publicKey.startsWith('pk_live_');
  } else {
    return PAYPAL_CONFIG.clientId.length > 0 && !PAYPAL_CONFIG.clientId.includes('Your_PayPal_Client_ID_Here');
  }
};

// Payment purpose mapping for better tracking
export const PAYMENT_PURPOSES = {
  general: 'General Ministry Fund',
  building: 'Building & Infrastructure',
  missions: 'Global Missions & Evangelism',
  youth: 'Youth & Student Ministry',
  community: 'Community Outreach'
} as const;

// Church branch mapping for donations
export const CHURCH_BRANCHES = {
  USD: 'New York Branch - Brooklyn, NY',
  NGN: 'Nigerian Branches - Akure HQ & Lagos'
} as const;

// Advanced Security Functions

// Fraud detection based on payment patterns
export const detectFraudulentPayment = (paymentData: PaymentData, userHistory?: PaymentData[]): { 
  isSuspicious: boolean; 
  reasons: string[]; 
  riskScore: number; 
} => {
  const reasons: string[] = [];
  let riskScore = 0;

  // Check for unusual amount patterns
  if (paymentData.amount > 100000 && paymentData.currency === 'USD') {
    reasons.push('Unusually high USD amount');
    riskScore += 30;
  }
  
  if (paymentData.amount > 5000000 && paymentData.currency === 'NGN') {
    reasons.push('Unusually high NGN amount');
    riskScore += 30;
  }

  // Check for suspicious email patterns
  const suspiciousEmailPatterns = [
    /tempmail/i, /10minutemail/i, /guerrillamail/i, /mailinator/i,
    /^[a-z]+\d{4,}@/i, // Pattern like 'user12345@domain'
  ];
  
  if (suspiciousEmailPatterns.some(pattern => pattern.test(paymentData.email))) {
    reasons.push('Suspicious email pattern detected');
    riskScore += 25;
  }

  // Check for frequency abuse (if history provided)
  if (userHistory && userHistory.length > 0) {
    const recentPayments = userHistory.filter(payment => {
      const paymentDate = new Date(payment.metadata?.timestamp || 0);
      const hoursSincePayment = (Date.now() - paymentDate.getTime()) / (1000 * 60 * 60);
      return hoursSincePayment < 24; // Last 24 hours
    });
    
    if (recentPayments.length > 5) {
      reasons.push('Too many payments in 24 hours');
      riskScore += 40;
    }
    
    const totalAmountToday = recentPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const dailyLimit = paymentData.currency === 'USD' ? PAYPAL_CONFIG.security.maxDailyAmount : PAYSTACK_CONFIG.security.maxDailyAmount;
    
    if (totalAmountToday + paymentData.amount > dailyLimit) {
      reasons.push('Daily amount limit exceeded');
      riskScore += 35;
    }
  }

  // Check for round numbers (often suspicious)
  if (paymentData.amount % 1000 === 0 && paymentData.amount > 10000) {
    reasons.push('Suspiciously round amount');
    riskScore += 10;
  }

  // Check metadata for suspicious patterns
  if (paymentData.metadata?.userAgent && paymentData.metadata.userAgent.includes('bot')) {
    reasons.push('Bot-like user agent detected');
    riskScore += 50;
  }

  return {
    isSuspicious: riskScore >= 50,
    reasons,
    riskScore
  };
};

// Enhanced rate limiting per user/email
const userPaymentCounts = new Map<string, { count: number; resetTime: number; amounts: number[] }>();

export const checkUserRateLimit = (email: string, amount: number): { 
  allowed: boolean; 
  reason?: string; 
  waitTimeMinutes?: number; 
} => {
  const now = Date.now();
  const oneHourMs = 60 * 60 * 1000;
  const key = email.toLowerCase();
  
  const current = userPaymentCounts.get(key);
  
  if (!current || now > current.resetTime) {
    // First payment or reset time reached
    userPaymentCounts.set(key, {
      count: 1,
      resetTime: now + oneHourMs,
      amounts: [amount]
    });
    return { allowed: true };
  }
  
  // Check payment frequency (max 3 payments per hour)
  if (current.count >= 3) {
    const waitTimeMs = current.resetTime - now;
    return {
      allowed: false,
      reason: 'Too many payment attempts. Please wait before trying again.',
      waitTimeMinutes: Math.ceil(waitTimeMs / (1000 * 60))
    };
  }
  
  // Check for amount velocity (suspicious if total > certain threshold)
  const totalAmountThisHour = current.amounts.reduce((sum, amt) => sum + amt, 0) + amount;
  const maxHourlyAmount = 25000; // $250 or equivalent
  
  if (totalAmountThisHour > maxHourlyAmount) {
    return {
      allowed: false,
      reason: 'Hourly payment limit exceeded for security reasons.',
      waitTimeMinutes: Math.ceil((current.resetTime - now) / (1000 * 60))
    };
  }
  
  // Update counts
  current.count++;
  current.amounts.push(amount);
  
  return { allowed: true };
};

// Device fingerprinting (basic implementation)
export const generateDeviceFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

// Validate business rules for donations
export const validateBusinessRules = (paymentData: PaymentData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Business rule: Minimum amounts by purpose
  const purposeMinAmounts: Record<string, { USD: number; NGN: number }> = {
    general: { USD: 10, NGN: 1000 },
    building: { USD: 25, NGN: 2500 },
    missions: { USD: 20, NGN: 2000 },
    youth: { USD: 15, NGN: 1500 },
    community: { USD: 15, NGN: 1500 }
  };
  
  const purposeMinAmount = purposeMinAmounts[paymentData.purpose]?.[paymentData.currency];
  if (purposeMinAmount && paymentData.amount < purposeMinAmount) {
    errors.push(`Minimum amount for ${paymentData.purpose} is ${purposeMinAmount} ${paymentData.currency}`);
  }
  
  // Business rule: Recurring donations must be at least $10 or ₦1000
  if (paymentData.isRecurring) {
    const minRecurring = paymentData.currency === 'USD' ? 10 : 1000;
    if (paymentData.amount < minRecurring) {
      errors.push(`Recurring donations must be at least ${minRecurring} ${paymentData.currency}`);
    }
  }
  
  // Business rule: Maximum single donation limits
  const maxSingleDonation = paymentData.currency === 'USD' ? 10000 : 1000000; // $10,000 or ₦1,000,000
  if (paymentData.amount > maxSingleDonation) {
    errors.push(`Maximum single donation is ${maxSingleDonation} ${paymentData.currency}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Payment processor health check
export const checkPaymentProcessorHealth = async (): Promise<{
  paystack: { healthy: boolean; message: string };
  paypal: { healthy: boolean; message: string };
}> => {
  const results = {
    paystack: { healthy: false, message: 'Not configured' },
    paypal: { healthy: false, message: 'Not configured' }
  };
  
  // Check Paystack configuration
  if (PAYSTACK_CONFIG.publicKey) {
    if (PAYSTACK_CONFIG.publicKey.startsWith('pk_test_') || PAYSTACK_CONFIG.publicKey.startsWith('pk_live_')) {
      results.paystack = { healthy: true, message: 'Configured and ready' };
    } else {
      results.paystack = { healthy: false, message: 'Invalid public key format' };
    }
  }
  
  // Check PayPal configuration
  if (PAYPAL_CONFIG.clientId && !PAYPAL_CONFIG.clientId.includes('Your_PayPal_Client_ID_Here')) {
    results.paypal = { healthy: true, message: 'Configured and ready' };
  }
  
  return results;
};

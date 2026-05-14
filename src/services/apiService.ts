import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  amount?: string;
  currency?: string;
  payerEmail?: string;
  payerName?: string;
  error?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toApiResponse<T>(res: AxiosResponse<any>): ApiResponse<T> {
  return {
    success: true,
    data: res.data?.data ?? res.data,
    message: res.data?.message ?? '',
    error: res.data?.error ?? '',
    timestamp: new Date().toISOString(),
  };
}

function toErrorResponse(error: any, fallback: string): never {
  throw new Error(error?.response?.data?.error ?? error?.message ?? fallback);
}

// ─── Payment Service (PayPal) ─────────────────────────────────────────────────

export class PaymentApiService {

  // Create a PayPal order on the backend
  static async createOrder(payload: {
    amount: string;
    currency?: string;
    purpose?: string;
  }): Promise<ApiResponse<{ orderId: string; status: string }>> {
    try {
      const res = await apiClient.post('/paypal/create-order', payload);
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to create PayPal order');
    }
  }

  // Capture order after donor approves in PayPal popup
  static async captureOrder(orderId: string): Promise<PaymentResult> {
    try {
      const res = await apiClient.post('/paypal/capture-order', { orderId });
      return res.data;
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.error ?? 'Failed to capture order',
      };
    }
  }

  // Get order details
  static async getOrder(orderId: string): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.get(`/paypal/order/${orderId}`);
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch order details');
    }
  }

  // Payment stats (USD only now)
  static async getPaymentStats(): Promise<ApiResponse<{
    totalAmount: number;
    totalCount: number;
    todayAmount: number;
    thisMonthAmount: number;
  }>> {
    try {
      const res = await apiClient.get('/payments/stats');
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch payment statistics');
    }
  }

  // Transaction history by email
  static async getTransactionHistory(
    email: string,
    limit = 10,
    offset = 0,
  ): Promise<ApiResponse<any[]>> {
    try {
      const res = await apiClient.get(`/payments/history/${encodeURIComponent(email)}`, {
        params: { limit, offset },
      });
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch transaction history');
    }
  }

  // Health check
  static async healthCheck(): Promise<ApiResponse<{
    database: boolean;
    paypal: boolean;
    timestamp: string;
  }>> {
    try {
      const res = await apiClient.get('/health');
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Health check failed');
    }
  }
}

// ─── Admin Service ────────────────────────────────────────────────────────────

export class AdminApiService {

  static async login(email: string, password: string): Promise<ApiResponse<{
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      lastLogin: string;
    };
  }>> {
    try {
      const res = await apiClient.post('/admin/login', { email, password });
      if (res.data?.token) localStorage.setItem('admin_token', res.data.token);
      else if (res.data?.data?.token) localStorage.setItem('admin_token', res.data.data.token);
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Login failed');
    }
  }

  static async getTransactions(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    fromDate?: string;
    toDate?: string;
  } = {}): Promise<ApiResponse<any[]>> {
    try {
      const res = await apiClient.get('/admin/transactions', { params });
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch transactions');
    }
  }

  static async getTransaction(id: string): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.get(`/admin/transactions/${id}`);
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch transaction details');
    }
  }

  static async updateTransactionStatus(
    id: string,
    status: string,
    notes?: string,
  ): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.put(`/admin/transactions/${id}/status`, { status, notes });
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to update transaction status');
    }
  }

  static async getDonors(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
  } = {}): Promise<ApiResponse<any[]>> {
    try {
      const res = await apiClient.get('/admin/donors', { params });
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch donors');
    }
  }

  static async getDonorDetails(donorId: string): Promise<ApiResponse<any>> {
    try {
      const res = await apiClient.get(`/admin/donors/${donorId}`);
      return toApiResponse(res);
    } catch (error) {
      toErrorResponse(error, 'Failed to fetch donor details');
    }
  }

  static logout() {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  }
}

export const handleApiError = (error: any, fallback = 'An error occurred'): string =>
  error?.response?.data?.error ?? error?.message ?? fallback;

export default { PaymentApiService, AdminApiService };
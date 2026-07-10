import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import { MembersUrlConfig } from '@/app/erp/members/members_url_config';
import { StoreUrlConfig } from '@/app/erp/store/store_url_config';
import { PlansUrlConfig } from '@/app/erp/plans/plans_url_config';
import { FinanceUrlConfig } from '@/app/erp/finance/finance_url_config';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function ssrApiFetch<T = unknown>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('gymsmart_token')?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { headers });
  
  if (!res.ok) {
    if (res.status === StatusCodes.UNAUTHORIZED) {
      throw new Error('Unauthorized');
    }
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export const ssrMembersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getStats: () => ssrApiFetch<{ success: boolean; data: any }>(MembersUrlConfig.BACKEND_API.STATS),
};

export const ssrPlansApi = {
  getAll: () => ssrApiFetch<{ success: boolean; data: any }>(PlansUrlConfig.BACKEND_API.BASE),
};

export const ssrStoreApi = {
  getProducts: () => ssrApiFetch<{ success: boolean; data: any }>(StoreUrlConfig.BACKEND_API.PRODUCTS_BASE),
  getOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${StoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  getStoreSummary: () => ssrApiFetch<{ success: boolean; data: any }>(StoreUrlConfig.BACKEND_API.SUMMARY),
};

export const ssrFinanceApi = {
  getPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}${q}`);
  },
  getSummary: () => ssrApiFetch<{ success: boolean; data: any }>(FinanceUrlConfig.BACKEND_API.SUMMARY),
};

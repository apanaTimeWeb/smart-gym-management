// RESPONSIBILITY: Provides strongly-typed network calls for the inquiries module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { InquiriesUrlConfig } from '@/app/erp/inquiries/inquiries_url_config';
import type { Inquiry, InquiryStats } from '@/app/erp/inquiries/inquiries_types/inquiries_types';

export const inquiriesApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ inquiries: Inquiry[]; total: number }>>(`${InquiriesUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getOne: (id: number) => apiFetch<ApiResponse<Inquiry>>(InquiriesUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () => apiFetch<ApiResponse<InquiryStats>>(InquiriesUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<Inquiry>) =>
    apiFetch<ApiResponse<Inquiry>>(InquiriesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Inquiry>) =>
    apiFetch<ApiResponse<Inquiry>>(InquiriesUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch<ApiResponse<{ id: number }>>(InquiriesUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
};

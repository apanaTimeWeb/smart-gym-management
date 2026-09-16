import { ManagerInquiriesUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Inquiry, InquiryStats } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';
import { inquirySchema, inquiryStatsSchema } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesSchema';
import { z } from 'zod';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';

export const inquiriesApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ inquiries: Inquiry[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ inquiries: z.array(inquirySchema), total: z.number() })
    });
  },
  
  getPlans: async (): Promise<ApiResponse<{name: string}[]>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/plans`, { dataSchema: z.array(z.object({ name: z.string() })) });
  },

  getPlansSnapshot: async (): Promise<ApiResponse<{ name: string }[]>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/plans-snapshot`, { dataSchema: z.array(z.object({ name: z.string() })) });
  },
  
  convertLead: async (id: string, body: Record<string, unknown>): Promise<ApiResponse<{ memberId: string }>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/${id}/convert`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.object({ memberId: z.string() }) });
  },
  
  getOne: async (id: string): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: inquirySchema });
  },
  
  getStats: async (): Promise<ApiResponse<InquiryStats>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: inquiryStatsSchema });
  },
  
  create: async (body: Partial<Inquiry>): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: inquirySchema });
  },
  
  update: async (id: string, body: Partial<Inquiry>): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: inquirySchema });
  },
  
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) });
  },
};

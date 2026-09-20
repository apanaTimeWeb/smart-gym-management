import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { inquirySchema, inquiryStatsSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerInquiriesSchema';
import { ManagerInquiriesUrlConfig } from '@/app/manager/inquiries/inquiries_url_config';
import type { Inquiry, InquiryStats } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';
import type { ApiResponse } from '@/lib/api';


export const inquiriesApi = {
  fetchInquiries: async (params?: Record<string, string>): Promise<ApiResponse<{ inquiries: Inquiry[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerInquiriesUrlConfig.BACKEND_API.BASE}${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ inquiries: z.array(inquirySchema), total: z.number() })
    });
  },
  
  fetchInquiryPlans: async (): Promise<ApiResponse<{name: string}[]>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.PLANS, { dataSchema: z.array(z.object({ name: z.string() })) });
  },

  fetchInquiryPlansSnapshot: async (): Promise<ApiResponse<{ name: string }[]>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.PLANS_SNAPSHOT, { dataSchema: z.array(z.object({ name: z.string() })) });
  },
  
  convertLead: async (id: string, body: Record<string, unknown>): Promise<ApiResponse<{ memberId: string }>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.CONVERT(id), { method: 'POST', body: JSON.stringify(body), dataSchema: z.object({ memberId: z.string() }) });
  },
  
  fetchInquiryById: async (id: string): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: inquirySchema });
  },
  
  fetchInquiryStats: async (): Promise<ApiResponse<InquiryStats>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.STATS, { dataSchema: inquiryStatsSchema });
  },
  
  createInquiry: async (body: Partial<Inquiry>): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: inquirySchema });
  },
  
  updateInquiry: async (id: string, body: Partial<Inquiry>): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: inquirySchema });
  },
  
  deleteInquiry: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  } };

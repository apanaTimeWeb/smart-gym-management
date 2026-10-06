import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { inquirySchema, inquiryStatsSchema } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesSchema';
import { ManagerInquiriesUrlConfig } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_url_config';
import type { Inquiry, InquiryStats, ManagerInquiriesWritePayload } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerInquiriesApi implementation for the inquiries module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesSchema; @/app/frontend_manager/manager_inquiries/manager_inquiries_url_config; @/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerInquiriesApi = {
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
  
  convertLead: async (id: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ memberId: string }>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.CONVERT(id), { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ memberId: z.string() }) });
  },
  
  fetchInquiryById: async (id: string): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { dataSchema: inquirySchema });
  },
  
  fetchInquiryStats: async (): Promise<ApiResponse<InquiryStats>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.STATS, { dataSchema: inquiryStatsSchema });
  },
  
  createInquiry: async (body: ManagerInquiriesWritePayload, idempotencyKey: string): Promise<ApiResponse<Inquiry>> => {
    const serializedBody = { ...body, ...(body.followUpLogs ? { followUpLogs: body.followUpLogs.map((log) => ({ ...log, date: log.date instanceof Date ? log.date.toISOString() : log.date })) } : {}) };
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: inquirySchema });
  },
  
  updateInquiry: async (id: string, body: ManagerInquiriesWritePayload, idempotencyKey: string): Promise<ApiResponse<Inquiry>> => {
    const serializedBody = { ...body, ...(body.followUpLogs ? { followUpLogs: body.followUpLogs.map((log) => ({ ...log, date: log.date instanceof Date ? log.date.toISOString() : log.date })) } : {}) };
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: inquirySchema });
  },
  
  deleteInquiry: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  } };

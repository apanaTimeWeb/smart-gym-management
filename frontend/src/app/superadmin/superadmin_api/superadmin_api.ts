// RESPONSIBILITY: Modularized API client for the Superadmin module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { 
  ApiResponse, 
  Tenant, 
  SubscriptionPlan, 
  CreatePlanPayload, 
  UpdatePlanPayload,
  SupportTicket,
  SaaSInvoice,
  FeatureFlag,
  ReleaseNote,
  Coupon,
  Affiliate,
  Broadcast,
  BackgroundJob,
  BackupRecord,
  SchemaMigration,
  GlobalAuditLog,
  SaaSDashboardMetrics
} from '@/app/superadmin/superadmin_types/superadmin_types';

/**
 * Superadmin API Client
 * Provides strictly typed methods for all 16 superadmin modules.
 */
export const superadminApi = {
  gyms: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<Tenant[]>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`),
    create: (body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(SuperadminUrlConfig.BACKEND_API.GYMS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    changeStatus: (id: string, status: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch<ApiResponse<unknown>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/stats`),
    emailOwner: (id: string, body: { subject: string; message: string; [key: string]: unknown }) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body) }),
  },
  plans: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<SubscriptionPlan[]>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`),
    create: (body: CreatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: UpdatePlanPayload) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'DELETE' }),
  },
  tickets: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<SupportTicket[]>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`),
    update: (id: string, body: Partial<SupportTicket>) => apiFetch<ApiResponse<SupportTicket>>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  invoices: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<SaaSInvoice[]>>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}${q}`);
    },
  },
  features: {
    getAll: () => apiFetch<ApiResponse<{ flags: FeatureFlag[]; notes: ReleaseNote[] }>>(SuperadminUrlConfig.BACKEND_API.FEATURES_BASE),
    createFlag: (body: Partial<FeatureFlag>) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags`, { method: 'POST', body: JSON.stringify(body) }),
    updateFlag: (id: string, body: Partial<FeatureFlag>) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    toggleFlag: (id: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}/toggle`, { method: 'PATCH' }),
    removeFlag: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'DELETE' }),
    createNote: (body: Partial<ReleaseNote>) => apiFetch<ApiResponse<ReleaseNote>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes`, { method: 'POST', body: JSON.stringify(body) }),
    updateNote: (id: string, body: Partial<ReleaseNote>) => apiFetch<ApiResponse<ReleaseNote>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    removeNote: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'DELETE' }),
  },
  coupons: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<Coupon[]>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}${q}`);
    },
    create: (body: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(SuperadminUrlConfig.BACKEND_API.COUPONS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Coupon>) => apiFetch<ApiResponse<Coupon>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'DELETE' }),
  },
  affiliates: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<Affiliate[]>>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}${q}`);
    },
    create: (body: Partial<Affiliate>) => apiFetch<ApiResponse<Affiliate>>(SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Affiliate>) => apiFetch<ApiResponse<Affiliate>>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    updateStatus: (id: string, status: string) => apiFetch<ApiResponse<Affiliate>>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'DELETE' }),
  },
  broadcasts: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<Broadcast[]>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}${q}`);
    },
    create: (body: Partial<Broadcast>) => apiFetch<ApiResponse<Broadcast>>(SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Broadcast>) => apiFetch<ApiResponse<Broadcast>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'DELETE' }),
    send: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}/send`, { method: 'POST' }),
  },
  jobs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<BackgroundJob[]>>(`${SuperadminUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
    },
  },
  backups: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<BackupRecord[]>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
    },
  },
  migrations: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<any>>(`${SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE}${q}`);
    },
  },
  auditLogs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}${q}`);
    },
    getTenantLogs: (tenantId?: string) => {
      const q = tenantId ? `?tenantId=${tenantId}` : '';
      return apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/tenant${q}`);
    },
    getGlobalLogs: () => apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/global`),
  },
  dashboard: {
    getData: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE),
    getMetrics: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(`${SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE}/metrics`),
  },
  settings: {
    getAll: () => apiFetch<ApiResponse<any>>(SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE),
    update: (id: string, body: Record<string, unknown>) => apiFetch<ApiResponse<any>>(`${SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  system: {
    getAll: () => apiFetch<ApiResponse<unknown>>(SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE),
    getHealthProbe: () => apiFetch<ApiResponse<unknown>>(`${SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE}/health`),
  },
  infrastructure: {
    getAll: () => apiFetch<ApiResponse<any>>(SuperadminUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE),
  },
};

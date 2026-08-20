// RESPONSIBILITY: Modularized API client for the Superadmin module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { 
  ApiResponse, 
  Tenant, 
  SubscriptionPlan, 
  CreatePlanPayload, 
  UpdatePlanPayload,
  BackgroundJob,
  SaaSDashboardMetrics,
  PlatformSetting,
  MigrationsPageData,
  InfrastructureNode,
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




  jobs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<BackgroundJob[]>>(`${SuperadminUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
    },
  },

  migrations: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<ApiResponse<MigrationsPageData>>(`${SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE}${q}`);
    },
  },

  dashboard: {
    getData: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE),
    getMetrics: () => apiFetch<ApiResponse<SaaSDashboardMetrics>>(`${SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE}/metrics`),
  },
  settings: {
    getAll: () => apiFetch<ApiResponse<PlatformSetting[]>>(SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE),
    update: (id: string, body: Record<string, unknown>) => apiFetch<ApiResponse<PlatformSetting>>(`${SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  system: {
    getAll: () => apiFetch<ApiResponse<unknown>>(SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE),
    getHealthProbe: () => apiFetch<ApiResponse<unknown>>(`${SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE}/health`),
  },
  infrastructure: {
    getAll: () => apiFetch<ApiResponse<InfrastructureNode[]>>(SuperadminUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE),
  },
};

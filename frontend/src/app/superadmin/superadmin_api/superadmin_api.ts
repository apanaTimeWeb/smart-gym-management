// RESPONSIBILITY: superadmin-api.ts handles the logic and UI for its corresponding feature.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';

/**
 * Superadmin API Client
 * Provides strictly typed methods for all 16 superadmin modules.
 */
export const superadminApi = {
  gyms: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown; meta?: unknown }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`),
    create: (body: unknown) => apiFetch(SuperadminUrlConfig.BACKEND_API.GYMS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    changeStatus: (id: string, status: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/stats`),
  },
  plans: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`),
    create: (body: unknown) => apiFetch(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'DELETE' }),
  },
  tickets: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  invoices: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}${q}`);
    },
  },
  features: {
    getAll: () => apiFetch<{ success: boolean; data: unknown }>(SuperadminUrlConfig.BACKEND_API.FEATURES_BASE),
    createFlag: (body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags`, { method: 'POST', body: JSON.stringify(body) }),
    updateFlag: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    toggleFlag: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}/toggle`, { method: 'PATCH' }),
    removeFlag: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'DELETE' }),
    createNote: (body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes`, { method: 'POST', body: JSON.stringify(body) }),
    updateNote: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    removeNote: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'DELETE' }),
  },
  coupons: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}${q}`);
    },
    create: (body: unknown) => apiFetch(SuperadminUrlConfig.BACKEND_API.COUPONS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'DELETE' }),
  },
  affiliates: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}${q}`);
    },
    create: (body: unknown) => apiFetch(SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    updateStatus: (id: string, status: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'DELETE' }),
  },
  broadcasts: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}${q}`);
    },
    create: (body: unknown) => apiFetch(SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'DELETE' }),
    send: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}/send`, { method: 'POST' }),
  },
  jobs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
    },
  },
  backups: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
    },
  },
  migrations: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE}${q}`);
    },
  },
  auditLogs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}${q}`);
    },
    getTenantLogs: (tenantId?: string) => {
      const q = tenantId ? `?tenantId=${tenantId}` : '';
      return apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/tenant${q}`);
    },
    getGlobalLogs: () => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/global`),
  },
  dashboard: {
    getData: () => apiFetch<{ success: boolean; data: unknown }>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE),
    getMetrics: () => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE}/metrics`),
  },
  settings: {
    getAll: () => apiFetch<{ success: boolean; data: unknown }>(SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE),
    update: (id: string, body: unknown) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  system: {
    getAll: () => apiFetch<{ success: boolean; data: unknown }>(SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE),
    getHealthProbe: () => apiFetch<{ success: boolean; data: unknown }>(`${SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE}/health`),
  },
  infrastructure: {
    getAll: () => apiFetch<{ success: boolean; data: unknown }>(SuperadminUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE),
  },
};

import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  let token = null;
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )gymsmart_token=([^;]+)'));
    if (match) token = match[2];
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `API Error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorData.error || errorMsg;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

/**
 * Superadmin API Client
 * Provides strictly typed methods for all 16 superadmin modules.
 */
export const superadminApi = {
  gyms: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any; meta?: any }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`),
    create: (body: any) => apiFetch(SuperadminUrlConfig.BACKEND_API.GYMS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    changeStatus: (id: string, status: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/stats`),
  },
  plans: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`),
    create: (body: any) => apiFetch(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, { method: 'DELETE' }),
  },
  tickets: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}${q}`);
    },
    getOne: (id: string) => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.TICKETS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  invoices: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.INVOICES_BASE}${q}`);
    },
  },
  features: {
    getAll: () => apiFetch<{ success: boolean; data: any }>(SuperadminUrlConfig.BACKEND_API.FEATURES_BASE),
    createFlag: (body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags`, { method: 'POST', body: JSON.stringify(body) }),
    updateFlag: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    toggleFlag: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}/toggle`, { method: 'PATCH' }),
    removeFlag: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/flags/${id}`, { method: 'DELETE' }),
    createNote: (body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes`, { method: 'POST', body: JSON.stringify(body) }),
    updateNote: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    removeNote: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.FEATURES_BASE}/notes/${id}`, { method: 'DELETE' }),
  },
  coupons: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}${q}`);
    },
    create: (body: any) => apiFetch(SuperadminUrlConfig.BACKEND_API.COUPONS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.COUPONS_BASE}/${id}`, { method: 'DELETE' }),
  },
  affiliates: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}${q}`);
    },
    create: (body: any) => apiFetch(SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE}/${id}`, { method: 'DELETE' }),
  },
  broadcasts: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}${q}`);
    },
    create: (body: any) => apiFetch(SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'DELETE' }),
    send: (id: string) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}/send`, { method: 'POST' }),
  },
  jobs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
    },
  },
  backups: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
    },
  },
  migrations: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE}${q}`);
    },
  },
  auditLogs: {
    getAll: (params?: Record<string, string>) => {
      const q = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}${q}`);
    },
    getTenantLogs: (tenantId?: string) => {
      const q = tenantId ? `?tenantId=${tenantId}` : '';
      return apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/tenant${q}`);
    },
    getGlobalLogs: () => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/global`),
  },
  dashboard: {
    getData: () => apiFetch<{ success: boolean; data: any }>(SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE),
    getMetrics: () => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.DASHBOARD_BASE}/metrics`),
  },
  settings: {
    getAll: () => apiFetch<{ success: boolean; data: any }>(SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE),
    update: (id: string, body: any) => apiFetch(`${SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  system: {
    getAll: () => apiFetch<{ success: boolean; data: any }>(SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE),
    getHealthProbe: () => apiFetch<{ success: boolean; data: any }>(`${SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE}/health`),
  },
  infrastructure: {
    getAll: () => apiFetch<{ success: boolean; data: any }>(SuperadminUrlConfig.BACKEND_API.INFRASTRUCTURE_BASE),
  },
};

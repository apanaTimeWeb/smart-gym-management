// RESPONSIBILITY: Modularized API client for the Gyms module. All methods use the module URL contract and own only Gym business transport. No UI logic.
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
import { z } from "zod";
import { TenantSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
import { GymStatsSchema, type GymStats } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
import { SuperadminGymsPlanOptionSchema, type SuperadminGymsPlanOption } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsPlanTypes';
export const gymsApi = {
    fetchGyms: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<Tenant[]>>(`${GymsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(TenantSchema) });
    },
    fetchGymById: (id: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: TenantSchema }),
    fetchSubscriptionPlans: () => apiFetch<ApiResponse<SuperadminGymsPlanOption[]>>(GymsUrlConfig.BACKEND_API.SUBSCRIPTION_PLANS, { dataSchema: z.array(SuperadminGymsPlanOptionSchema) }),
    createGym: (body: Partial<Tenant>, idempotencyKey?: string) => apiFetch<ApiResponse<Tenant>>(GymsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: TenantSchema
    }),
    updateGym: (id: string, body: Partial<Tenant>, idempotencyKey?: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: TenantSchema
    }),
    updateGymStatus: (id: string, status: string, idempotencyKey?: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: TenantSchema
    }),
    impersonateTenant: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<{
        token: string;
    }>>(`${GymsUrlConfig.BACKEND_API.IMPERSONATE}/${id}/impersonate`, { method: 'POST',
        dataSchema: z.object({ token: z.string() }),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
    deleteGym: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    fetchGymStats: () => apiFetch<ApiResponse<GymStats>>(`${GymsUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: GymStatsSchema }),
    emailGymOwner: (id: string, body: {
        subject: string;
        message: string;
        [key: string]: unknown;
    }, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body),
        dataSchema: z.object({}).passthrough(),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
    exportGymsReport: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<{
            downloadUrl: string;
        }>>(`${GymsUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.object({ downloadUrl: z.string() }) });
    },
    /** Provisions a brand-new isolated tenant database and creates the gym in the SaaS system. */
    provisionGym: (body: Record<string, unknown>, idempotencyKey?: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/provision`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: TenantSchema
    }),
    exitGhostLogin: (idempotencyKey?: string) => apiFetch<ApiResponse<null>>(GymsUrlConfig.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY, {
        method: 'POST',
        dataSchema: z.null(),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
    /** Sends the impersonation token to the proxy endpoint to set it as an HTTP-only cookie. */
    setGhostLoginCookie: async (token: string, id: string, idempotencyKey?: string) => {
        return apiFetch<ApiResponse<null>>(GymsUrlConfig.GHOST_LOGIN.SET_COOKIE_PROXY, {
            method: 'POST',
            body: JSON.stringify({
                token,
                refreshToken: token,
                user: { role: 'ADMIN', email: `admin-${id}@gym.com`, name: 'Impersonated Admin', tenantId: id, id: `user-${id}` },
            }),
            dataSchema: z.null(),
            headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
        });
    },
};

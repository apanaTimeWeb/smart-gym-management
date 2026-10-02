import { z } from 'zod';
import { TenantSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsContractSchemas';
import { SuperadminGymsPlanOptionSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsPlanContractSchemas';
import { SuperadminGymsNullResponseSchema, SuperadminGymsEmptyResponseSchema, SuperadminGymsDownloadResponseSchema, SuperadminGymsImpersonateTokenSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsApiSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

// RESPONSIBILITY: Modularized API client for the Gyms module. All methods use the module URL contract and own only Gym business transport. No UI logic.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { SuperadminGymsPlanOption } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsPlanTypes';
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';
import type { ApiResponse } from '@/lib/api';


export const gymsApi = {
    fetchGyms: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<Tenant[]>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: z.array(TenantSchema) });
    },
    fetchGymById: (id: string) => apiFetch<ApiResponse<Tenant>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, { dataSchema: TenantSchema }),
    fetchSubscriptionPlans: () => apiFetch<ApiResponse<SuperadminGymsPlanOption[]>>(MODULE_URLS.BACKEND_API.SUBSCRIPTION_PLANS, { dataSchema: z.array(SuperadminGymsPlanOptionSchema) }),
    createGym: (body: Partial<Tenant>, idempotencyKey: string) => apiFetch<ApiResponse<Tenant>>(MODULE_URLS.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: TenantSchema
    }),
    updateGym: (id: string, body: Partial<Tenant>, idempotencyKey: string) => apiFetch<ApiResponse<Tenant>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: TenantSchema
    }),
    updateGymStatus: (id: string, status: string, idempotencyKey: string) => apiFetch<ApiResponse<Tenant>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: TenantSchema
    }),
    impersonateTenant: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<{
        token: string;
    }>>(`${MODULE_URLS.BACKEND_API.IMPERSONATE}/${id}/impersonate`, { method: 'POST',
        dataSchema: SuperadminGymsImpersonateTokenSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    deleteGym: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminGymsEmptyResponseSchema
    }),

    emailGymOwner: (id: string, body: {
        subject: string;
        message: string;
        [key: string]: unknown;
    }, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body),
        dataSchema: SuperadminGymsEmptyResponseSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    exportGymsReport: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<{
            downloadUrl: string;
        }>>(`${MODULE_URLS.BACKEND_API.BASE}/export${q}`, { dataSchema: SuperadminGymsDownloadResponseSchema });
    },
    /** Provisions a brand-new isolated tenant database and creates the gym in the SaaS system. */
    provisionGym: (body: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<Tenant>>(`${MODULE_URLS.BACKEND_API.BASE}/provision`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: TenantSchema
    }),
    exitGhostLogin: (idempotencyKey: string) => apiFetch<ApiResponse<null>>(MODULE_URLS.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY, {
        method: 'POST',
        dataSchema: SuperadminGymsNullResponseSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    /** Sends the impersonation token to the proxy endpoint to set it as an HTTP-only cookie. */
    setGhostLoginCookie: async (token: string, id: string, idempotencyKey: string) => {
        return apiFetch<ApiResponse<null>>(MODULE_URLS.GHOST_LOGIN.SET_COOKIE_PROXY, {
            method: 'POST',
            body: JSON.stringify({
                token,
                refreshToken: token,
                user: { role: 'ADMIN', email: `admin-${id}@gym.com`, name: 'Impersonated Admin', tenantId: id, id: `user-${id}` },
            }),
            dataSchema: SuperadminGymsNullResponseSchema,
            headers: { 'Idempotency-Key': idempotencyKey }
        });
    },
};

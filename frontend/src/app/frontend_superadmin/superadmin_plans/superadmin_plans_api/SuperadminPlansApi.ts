import { z } from 'zod';
import { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansContractSchemas';
import { SuperadminPlansEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansApiSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlansApi owned by the superadmin_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes, zod, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SUPERADMIN_PLANS_API } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config';

import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes';
import type { ApiResponse } from '@/lib/api';


export const plansApi = {
    fetchPlans: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SubscriptionPlan[]>>(`${SUPERADMIN_PLANS_API.BASE}${q}`, { dataSchema: z.array(SubscriptionPlanSchema) });
    },
    fetchPlanById: (id: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SUPERADMIN_PLANS_API.BASE}/${id}`, { dataSchema: SubscriptionPlanSchema }),
    createPlan: (body: CreatePlanPayload, idempotencyKey: string) => apiFetch<ApiResponse<SubscriptionPlan>>(SUPERADMIN_PLANS_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SubscriptionPlanSchema
    }),
    updatePlan: (id: string, body: UpdatePlanPayload, idempotencyKey: string) => apiFetch<ApiResponse<SubscriptionPlan>>(`${SUPERADMIN_PLANS_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SubscriptionPlanSchema
    }),
    deletePlan: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SUPERADMIN_PLANS_API.BASE}/${id}`, { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminPlansEmptyResponseSchema
    }),
    archivePlan: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SUPERADMIN_PLANS_API.BASE}/${id}/archive`, { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminPlansEmptyResponseSchema
    }),
};

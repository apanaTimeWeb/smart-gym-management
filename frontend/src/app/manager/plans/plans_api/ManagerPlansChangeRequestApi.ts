// RESPONSIBILITY: Sends Manager plan-change requests through the module API boundary.
// DATA FLOW: Request form → change-request API → Zod validation → TanStack Query mutation.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import type { ManagerPlansChangeRequestPayload, ManagerPlansChangeRequestResponse } from '@/app/manager/plans/plans_types/ManagerPlansChangeRequestTypes';
import { managerPlansChangeRequestResponseSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansChangeRequestSchema';

export const managerPlansChangeRequestApi = {
  createChangeRequest: async (body: ManagerPlansChangeRequestPayload): Promise<ApiResponse<ManagerPlansChangeRequestResponse>> =>
    apiFetch(ManagerPlansUrlConfig.BACKEND_API.CHANGE_REQUESTS, {
      method: 'POST',
      body: JSON.stringify(body),
      dataSchema: managerPlansChangeRequestResponseSchema }) };

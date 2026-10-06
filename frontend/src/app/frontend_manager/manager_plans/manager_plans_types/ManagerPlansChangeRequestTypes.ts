import type { MANAGER_PLANS_PENDING_REQUEST_STATUS } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansConstants';
// RESPONSIBILITY: Types for Manager plan-change requests submitted to the backend.
export interface ManagerPlansChangeRequestPayload {
  planId: string;
  note: string;
}

export interface ManagerPlansChangeRequestResponse {
  requestId: string;
  status: typeof MANAGER_PLANS_PENDING_REQUEST_STATUS;
}

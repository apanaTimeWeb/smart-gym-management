// RESPONSIBILITY: Types for Manager plan-change requests submitted to the backend.
export interface ManagerPlansChangeRequestPayload {
  planId: string;
  note: string;
}

export interface ManagerPlansChangeRequestResponse {
  requestId: string;
  status: 'PENDING';
}

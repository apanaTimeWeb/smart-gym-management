// RESPONSIBILITY: Defines the durable, tenant-aware message contract used by backend background workers.
// FLOW: Feature command -> AdminCoreJobQueueService -> Redis list -> worker -> feature job completion.
export interface AdminCoreJobMessage<TPayload = Record<string, unknown>> {
  jobId: string;
  type: string;
  tenantId: string;
  userId: string;
  userRole: string;
  payload: TPayload;
  attempt: number;
  enqueuedAt: string;
}

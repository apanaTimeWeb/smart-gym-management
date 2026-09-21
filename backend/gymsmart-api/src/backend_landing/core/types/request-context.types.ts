// RESPONSIBILITY: Defines the request-scoped execution context available to deep backend layers.
// FLOW: HTTP request → AsyncLocalStorage → controllers/services/repositories.
export interface RequestContextValue {
  requestId: string;
  traceId: string;
  spanId: string;
  tenantId: string | null;
  userId: string | null;
  ipAddress: string | null;
}

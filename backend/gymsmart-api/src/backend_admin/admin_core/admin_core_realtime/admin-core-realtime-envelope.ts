// RESPONSIBILITY: Defines the strict, transport-neutral envelope used for realtime events.
// FLOW: Feature persistence commit → AdminCoreRealtimePublisherService → Redis Pub/Sub → WebSocket transport.

export interface AdminCoreRealtimeEnvelope<TPayload extends Record<string, unknown>> {
  event: string;
  tenantId: string | null;
  emittedAt: string;
  data: TPayload;
}

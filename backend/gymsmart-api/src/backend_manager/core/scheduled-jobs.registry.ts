// RESPONSIBILITY: Master inventory for every distributed scheduled background job in this application.
// FLOW: Job implementation -> registry entry -> operational review/DLQ ownership.
export interface ScheduledJobRegistryEntry {
  name: string; module: string; file: string; schedule: string; description: string; touchesEntities: readonly string[]; failureBehavior: string; idempotent: boolean;
}
export const SCHEDULED_JOBS_REGISTRY: readonly ScheduledJobRegistryEntry[] = [];

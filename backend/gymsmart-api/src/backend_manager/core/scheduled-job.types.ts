// RESPONSIBILITY: Defines the centralized scheduled-job inventory entry contract.
// FLOW: Job metadata -> registry entry -> operational review and DLQ ownership.
export interface ScheduledJobRegistryEntry {
  name: string;
  module: string;
  file: string;
  schedule: string;
  description: string;
  touchesEntities: readonly string[];
  failureBehavior: string;
  idempotent: boolean;
}

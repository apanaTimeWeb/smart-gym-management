// RESPONSIBILITY: Defines the required metadata contract for every future distributed scheduled job.
// FLOW: Feature job declaration -> ScheduledJobDefinition -> centralized job registry -> distributed scheduler.

export interface ScheduledJobDefinition {
  name: string;
  queue: string;
  trigger: string;
  schedule: string;
  timezone: string;
  retryLimit: number;
  dlq: string;
  timeoutMs: number;
  ownerModule: string;
}

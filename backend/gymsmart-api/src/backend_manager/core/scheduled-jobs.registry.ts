// RESPONSIBILITY: Master inventory for every distributed scheduled background job in this application.
// FLOW: Job implementation -> registry entry -> operational review/DLQ ownership.
import type { ScheduledJobRegistryEntry } from '@/backend_manager/core/scheduled-job.types';


export const SCHEDULED_JOBS_REGISTRY: readonly ScheduledJobRegistryEntry[] = [];

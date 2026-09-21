// RESPONSIBILITY: Stores the canonical inventory of distributed scheduled jobs and their operational ownership metadata.
// FLOW: Feature job registration -> SCHEDULED_JOBS_REGISTRY -> distributed scheduler/ops review.

import type { ScheduledJobDefinition } from '@/backend_auth/core/scheduled-jobs.interfaces';

export const SCHEDULED_JOBS_REGISTRY: readonly ScheduledJobDefinition[] = [];

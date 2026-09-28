// RESPONSIBILITY: Master inventory for every distributed scheduled background job in Manager backend.
// FLOW: Job implementation -> registry entry -> host distributed scheduler -> operational review/DLQ.
import type { ScheduledJobRegistryEntry } from '@/backend_manager/manager_core/manager-core-scheduled-job.types';

export const SCHEDULED_JOBS_REGISTRY: readonly ScheduledJobRegistryEntry[] = [
  {
    name: 'manager-communications-delivery-worker',
    module: 'backend_manager/communications',
    file: 'manager_modules/communications/communications_services/manager-communications-process-delivery-jobs.service.ts',
    schedule: 'every 10 seconds',
    description: 'Claims one queued communications delivery job, sends through primary/fallback medium, retries failures and dead-letters exhausted jobs.',
    touchesEntities: ['manager_communications', 'manager_communications_delivery_jobs', 'audit_logs'],
    failureBehavior: 'Exponential retry up to 5 attempts, then DEAD_LETTER; audit every terminal and retry state.',
    idempotent: true,
  },
];

import type { BackgroundJob } from '@/app/superadmin/superadmin_types/superadmin_types';

export const MOCK_BACKGROUND_JOBS: BackgroundJob[] = [
  {
    id: 'job-1',
    queueName: 'billing',
    jobName: 'Process Monthly Invoices',
    status: 'COMPLETED',
    attempts: 1,
    createdAt: '2026-09-14T01:00:00Z',
  },
  {
    id: 'job-2',
    queueName: 'export',
    jobName: 'Export Tenant Data',
    status: 'FAILED',
    attempts: 3,
    error: 'Connection timeout to replica DB',
    createdAt: '2026-09-14T08:30:00Z',
  },
  {
    id: 'job-3',
    queueName: 'emails',
    jobName: 'Send Campaign Blast',
    status: 'ACTIVE',
    attempts: 1,
    createdAt: '2026-09-14T09:00:00Z',
  },
  {
    id: 'job-4',
    queueName: 'maintenance',
    jobName: 'Clean Stale Sessions',
    status: 'DELAYED',
    attempts: 0,
    createdAt: '2026-09-14T10:00:00Z',
  }
];

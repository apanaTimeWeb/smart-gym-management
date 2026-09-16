// RESPONSIBILITY: Demo fixture data and static display constants for Superadmin background jobs.
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';

export const MOCK_BACKGROUND_JOBS: BackgroundJob[] = [
  { id: 'job-1', queueName: 'billing', jobName: 'Process Monthly Invoices', status: 'COMPLETED', attempts: 1, createdAt: '2026-09-15T01:00:00Z' },
  { id: 'job-2', queueName: 'export', jobName: 'Export Tenant Data', status: 'FAILED', attempts: 3, error: 'Connection timeout to replica DB', createdAt: '2026-09-15T08:30:00Z' },
  { id: 'job-3', queueName: 'email', jobName: 'Send Campaign Blast', status: 'ACTIVE', attempts: 1, createdAt: '2026-09-15T09:00:00Z' },
  { id: 'job-4', queueName: 'maintenance', jobName: 'Clean Stale Sessions', status: 'DELAYED', attempts: 0, createdAt: '2026-09-15T10:00:00Z' },
  { id: 'job-5', queueName: 'webhook', jobName: 'Deliver Payment Webhooks', status: 'ACTIVE', attempts: 2, createdAt: '2026-09-14T11:15:00Z' },
  { id: 'job-6', queueName: 'database', jobName: 'Rebuild Tenant Index', status: 'COMPLETED', attempts: 1, createdAt: '2026-09-14T12:45:00Z' },
  { id: 'job-7', queueName: 'billing', jobName: 'Retry Failed Invoice', status: 'FAILED', attempts: 5, error: 'Payment provider unavailable', createdAt: '2026-09-13T03:20:00Z' },
  { id: 'job-8', queueName: 'export', jobName: 'Generate Usage CSV', status: 'DELAYED', attempts: 1, createdAt: '2026-09-12T04:50:00Z' },
  { id: 'job-9', queueName: 'email', jobName: 'Send Renewal Reminders', status: 'COMPLETED', attempts: 1, createdAt: '2026-08-30T06:05:00Z' },
  { id: 'job-10', queueName: 'webhook', jobName: 'Sync Affiliate Events', status: 'FAILED', attempts: 4, error: 'Remote endpoint returned an error', createdAt: '2026-08-25T13:40:00Z' },
  { id: 'job-11', queueName: 'database', jobName: 'Vacuum Tenant Tables', status: 'ACTIVE', attempts: 1, createdAt: '2026-08-20T02:10:00Z' },
  { id: 'job-12', queueName: 'maintenance', jobName: 'Refresh Materialized Views', status: 'COMPLETED', attempts: 1, createdAt: '2026-08-18T09:25:00Z' },
];

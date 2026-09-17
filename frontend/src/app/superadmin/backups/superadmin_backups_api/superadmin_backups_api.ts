// RESPONSIBILITY: Provides typed API operations for Superadmin backup records and backup scheduling.
import { BackupRecordSchema, BackupScheduleSchema, type BackupSchedule } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { BackupsUrlConfig } from '@/app/superadmin/backups/superadmin_backups_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { z } from 'zod';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

export const backupsApi = {
  fetchBackups: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${BackupsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BackupRecordSchema) });
  },
  createBackupSnapshot: () => apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/trigger`, { method: 'POST', dataSchema: z.null() }),
  restoreBackupSnapshot: (id: string) => apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/${id}/restore`, { method: 'POST', dataSchema: z.null() }),
  updateBackupSchedule: (schedule: BackupSchedule) => apiFetch<ApiResponse<BackupSchedule>>(BackupsUrlConfig.BACKEND_API.SCHEDULE, { method: 'PATCH', body: JSON.stringify(schedule), dataSchema: BackupScheduleSchema }),
  fetchBackupDownloadUrl: (id: string) => `${BackupsUrlConfig.BACKEND_API.BASE}/${id}/download`,
};

// RESPONSIBILITY: Provides API access for Superadmin backup operations; demo behavior is owned by this module's MSW handlers.
import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { BackupsUrlConfig } from '@/app/superadmin/system-ops/backups/superadmin_backups_url_config';
import { BackupRecordSchema } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
import { SuperadminBackupsScheduleSchema } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsScheduleTypes';
import type { SuperadminBackupsSchedule, SuperadminBackupsScheduleInput } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsScheduleTypes';

export async function fetchBackups(params?: Record<string, string>): Promise<ApiResponse<BackupRecord[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${BackupsUrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: z.array(BackupRecordSchema) });
}

export async function createBackupSnapshot(idempotencyKey?: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(BackupsUrlConfig.BACKEND_API.TRIGGER, { method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: z.null() });
}

export async function restoreBackupSnapshot(id: string, idempotencyKey?: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(BackupsUrlConfig.BACKEND_API.RESTORE(id), { method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: z.null() });
}

export async function fetchBackupDownloadUrl(id: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(BackupsUrlConfig.BACKEND_API.DOWNLOAD(id), { dataSchema: z.object({ downloadUrl: z.string().min(1) }) });
}

export async function fetchBackupSchedule(): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<ApiResponse<SuperadminBackupsSchedule>>(BackupsUrlConfig.BACKEND_API.SCHEDULE, {
        dataSchema: SuperadminBackupsScheduleSchema,
    });
}

export async function updateBackupSchedule(input: SuperadminBackupsScheduleInput): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<ApiResponse<SuperadminBackupsSchedule>>(BackupsUrlConfig.BACKEND_API.SCHEDULE, {
        method: 'PATCH',
        body: JSON.stringify(input),
        dataSchema: SuperadminBackupsScheduleSchema,
    });
}

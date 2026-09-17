// RESPONSIBILITY: Provides API access for Superadmin backup operations; demo behavior is owned by this module's MSW handlers.
import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { BackupsUrlConfig } from '@/app/superadmin/backups/superadmin_backups_url_config';
import { BackupRecordSchema } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

export async function fetchBackups(params?: Record<string, string>): Promise<ApiResponse<BackupRecord[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${BackupsUrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: z.array(BackupRecordSchema) });
}

export async function createBackupSnapshot(): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(BackupsUrlConfig.BACKEND_API.TRIGGER, { method: 'POST', dataSchema: z.null() });
}

export async function restoreBackupSnapshot(id: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(BackupsUrlConfig.BACKEND_API.RESTORE(id), { method: 'POST', dataSchema: z.null() });
}

export async function fetchBackupDownloadUrl(id: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(BackupsUrlConfig.BACKEND_API.DOWNLOAD(id), { dataSchema: z.object({ downloadUrl: z.string().min(1) }) });
}

// RESPONSIBILITY: Provides API access for Superadmin backup operations; demo behavior is owned by this module's MSW handlers.
import { SuperadminBackupDownloadDataSchema, SuperadminBackupsListDataSchema, SuperadminBackupsNullDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminSystemOpsBackupsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_url_config';
import { SuperadminSystemOpsBackupsScheduleSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema';
import { BackupRecordSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsSchema';

import type { SuperadminBackupsSchedule, SuperadminBackupsScheduleInput } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTypes';
import type { ApiResponse } from '@/lib/api';

export async function fetchBackups(params?: Record<string, string>): Promise<ApiResponse<BackupRecord[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminBackupsListDataSchema });
}

/**
 * Requests creation of a backup snapshot through the module-owned API contract.
 * @description Starts a backup mutation for the Superadmin Backups feature.
 * @dependencies Uses the module-owned API transport and Zod response validation.
 * @edge-case Preserves mutation failure semantics for the owning retry/confirmation flow.
 */
export async function createBackupSnapshot(idempotencyKey: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.TRIGGER, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminBackupsNullDataSchema });
}

/**
 * @description Restores one validated backup snapshot through the feature-owned API contract.
 * @dependencies Uses the Superadmin backups URL configuration, canonical API transport, and idempotency header.
 * @edge-case Propagates the backend response message/error so the caller can expose the real failure and retry safely.
 */
export async function restoreBackupSnapshot(id: string, idempotencyKey: string): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.RESTORE(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminBackupsNullDataSchema });
}

export async function fetchBackupDownloadUrl(id: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.DOWNLOAD(id), { dataSchema: SuperadminBackupDownloadDataSchema });
}

export async function fetchBackupSchedule(): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<ApiResponse<SuperadminBackupsSchedule>>(SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.SCHEDULE, {
        dataSchema: SuperadminSystemOpsBackupsScheduleSchema,
    });
}

export async function updateBackupSchedule(input: SuperadminBackupsScheduleInput, idempotencyKey: string): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<ApiResponse<SuperadminBackupsSchedule>>(SuperadminSystemOpsBackupsUrlConfig.BACKEND_API.SCHEDULE, {
        method: 'PATCH',
        body: JSON.stringify(input),
        dataSchema: SuperadminSystemOpsBackupsScheduleSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    });
}

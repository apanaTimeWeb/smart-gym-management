import { apiFetch } from '@/lib/apiFetch';
import type { ApiResponse } from '@/types/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/backups_types';

export const backupsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
  },
};

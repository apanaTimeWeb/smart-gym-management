import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/backups_types';

export const backupsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
  },
};

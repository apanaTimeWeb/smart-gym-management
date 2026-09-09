import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

export const backupsApi = {
  fetchBackups: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}${q}`);
  },
  triggerSnapshot: () => {
    return apiFetch<ApiResponse<null>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}/trigger`, {
      method: 'POST'
    });
  },
  restoreSnapshot: (id: string) => {
    return apiFetch<ApiResponse<null>>(`${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}/${id}/restore`, {
      method: 'POST'
    });
  },
  getDownloadUrl: (id: string) => {
    // In a real app, this might return a signed URL or stream a blob. We just construct a relative API URL for the <a> tag.
    return `${process.env.NEXT_PUBLIC_API_URL || ''}${SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE}/${id}/download`;
  }
};

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { BackupsUrlConfig } from '@/app/superadmin/backups/backups_url_config';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { z } from "zod";

export const backupsApi = {
  fetchBackups: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackupRecord[]>>(`${BackupsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  triggerSnapshot: () => {
    return apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/trigger`, {
      method: 'POST',
        dataSchema: z.unknown()
    });
  },
  restoreSnapshot: (id: string) => {
    return apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/${id}/restore`, {
      method: 'POST',
        dataSchema: z.unknown()
    });
  },
  getDownloadUrl: (id: string) => {
    // In a real app, this might return a signed URL or stream a blob. We just construct a relative API URL for the <a> tag.
    return `${process.env.NEXT_PUBLIC_API_URL || ''}${BackupsUrlConfig.BACKEND_API.BASE}/${id}/download`;
  }
};

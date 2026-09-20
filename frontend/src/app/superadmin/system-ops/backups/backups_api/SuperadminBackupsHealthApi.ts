// RESPONSIBILITY: Provides API access for Superadmin backup safety and restore readiness; demo behavior is owned by module MSW handlers.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminBackupsV1UrlConfig } from '@/app/superadmin/system-ops/backups/superadmin_backups_health_url_config';
import { SuperadminBackupsV1DataSchema, type SuperadminBackupsV1Data } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsV1Types';

export async function fetchBackupsHealth(): Promise<ApiResponse<SuperadminBackupsV1Data>> {
    return apiFetch<ApiResponse<SuperadminBackupsV1Data>>(SuperadminBackupsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminBackupsV1DataSchema });
}

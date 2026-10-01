// RESPONSIBILITY: Provides API access for Superadmin backup safety and restore readiness; demo behavior is owned by module MSW handlers.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminBackupsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_url_config';
import { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsV1Schema';

import type { SuperadminBackupsV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchBackupsHealth(): Promise<ApiResponse<SuperadminBackupsV1Data>> {
    return apiFetch<ApiResponse<SuperadminBackupsV1Data>>(SuperadminBackupsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminBackupsV1DataSchema });
}

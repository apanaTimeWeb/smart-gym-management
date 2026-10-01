// RESPONSIBILITY: Owns the Superadmin tenant-data export request contract.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminDataExportResponseSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileDataExportSchema';
import { SuperadminProfileUrlConfig } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';

import type { ApiResponse } from '@/lib/api';

export const superadminProfileDataExportApi = {
  requestFullDataExport: (idempotencyKey: string) => apiFetch<ApiResponse<null>>(SuperadminProfileUrlConfig.BACKEND_API.EXPORT_DATA, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminLayoutApiResponseSchema(SuperadminDataExportResponseSchema),
  }),
};

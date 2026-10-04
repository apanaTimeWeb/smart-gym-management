import { SuperadminSettingsV1DataSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { SUPERADMIN_SETTINGS_GOVERNANCE } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config';

import type { SuperadminSettingsV1Data } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsV1Types';
import type { ApiResponse } from '@/lib/api';


export async function fetchSettingsGovernance(): Promise<ApiResponse<SuperadminSettingsV1Data>> {
    return apiFetch<ApiResponse<SuperadminSettingsV1Data>>(SUPERADMIN_SETTINGS_GOVERNANCE.BACKEND_API.BASE, { dataSchema: SuperadminSettingsV1DataSchema });
}

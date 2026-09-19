// RESPONSIBILITY: Provides API access for the Platform Governance feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminSettingsV1UrlConfig } from '@/app/superadmin/settings/superadmin_settings_governance_url_config';
import { SuperadminSettingsV1DataSchema, type SuperadminSettingsV1Data } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types';
export async function fetchSettingsGovernance(): Promise<ApiResponse<SuperadminSettingsV1Data>> {
    return apiFetch<ApiResponse<SuperadminSettingsV1Data>>(SuperadminSettingsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminSettingsV1DataSchema });
}

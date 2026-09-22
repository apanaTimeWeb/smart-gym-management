// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminSettingsV1UrlConfig } from '@/app/superadmin/settings/superadmin_settings_governance_url_config';
import { SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/superadmin/settings/settings_mocks/fixtures/SuperadminSettingsV1MockFixtures';
export const superadminSettingsV1Handlers = [
    http.get('*' + SuperadminSettingsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE })),
    http.post('*/api/superadmin/export-data', () => {
        return new HttpResponse(null, { status: 202 });
    }),
];

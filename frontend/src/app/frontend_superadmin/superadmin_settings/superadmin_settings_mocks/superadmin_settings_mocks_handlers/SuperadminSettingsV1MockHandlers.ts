import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_fixtures/SuperadminSettingsV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSettingsV1MockHandlers owned by the superadmin_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config, @/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_fixtures/SuperadminSettingsV1MockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config';


export const superadminSettingsV1Handlers = [
    http.get('*' + MODULE_URLS.GOVERNANCE.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE })),
    http.post('*/superadmin/superadmin_export_data', () => {
        return new HttpResponse(null, { status: StatusCodes.ACCEPTED });
    }),
];

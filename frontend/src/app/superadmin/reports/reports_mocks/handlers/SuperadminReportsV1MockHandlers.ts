// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminReportsV1UrlConfig } from '@/app/superadmin/reports/superadmin_reports_comparison_url_config';
import { SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/reports/reports_mocks/fixtures/SuperadminReportsV1MockFixtures';
export const superadminReportsV1Handlers = [
    http.get(SuperadminReportsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE })),
];

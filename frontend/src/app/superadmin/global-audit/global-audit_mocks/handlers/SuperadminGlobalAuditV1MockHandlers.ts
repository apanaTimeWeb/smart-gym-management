// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminGlobalAuditV1UrlConfig } from '@/app/superadmin/global-audit/superadmin_global_audit_investigation_url_config';
import { SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE } from '@/app/superadmin/global-audit/global-audit_mocks/fixtures/SuperadminGlobalAuditV1MockFixtures';
export const superadminGlobalAuditV1Handlers = [
    http.get('*' + SuperadminGlobalAuditV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE })),
];

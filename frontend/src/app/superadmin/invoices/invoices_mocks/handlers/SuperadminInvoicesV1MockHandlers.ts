// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminInvoicesV1UrlConfig } from '@/app/superadmin/invoices/superadmin_invoices_recovery_center_url_config';
import { SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE } from '@/app/superadmin/invoices/invoices_mocks/fixtures/SuperadminInvoicesV1MockFixtures';
export const superadminInvoicesV1Handlers = [
    http.get('*' + SuperadminInvoicesV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE })),
];

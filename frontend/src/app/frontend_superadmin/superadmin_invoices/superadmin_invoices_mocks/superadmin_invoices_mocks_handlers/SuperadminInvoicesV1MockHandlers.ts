import { http, HttpResponse } from 'msw';
import { SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_fixtures/SuperadminInvoicesV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminInvoicesV1MockHandlers owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_fixtures/SuperadminInvoicesV1MockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config';


export const superadminInvoicesV1Handlers = [
    http.get('*' + MODULE_URLS.RECOVERY_CENTER.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE })),
];

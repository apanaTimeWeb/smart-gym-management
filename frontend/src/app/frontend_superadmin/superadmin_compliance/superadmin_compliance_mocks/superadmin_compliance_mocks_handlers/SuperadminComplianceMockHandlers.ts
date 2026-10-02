import { http, HttpResponse } from 'msw';
import { SUPERADMIN_COMPLIANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_mocks/superadmin_compliance_mocks_fixtures/SuperadminComplianceMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminComplianceMockHandlers owned by the superadmin_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_url_config, @/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_mocks/superadmin_compliance_mocks_fixtures/SuperadminComplianceMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_url_config';


export const superadminComplianceHandlers = [http.get('*' + MODULE_URLS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_COMPLIANCE_MOCK_FIXTURE }))];

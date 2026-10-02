import { http, HttpResponse } from 'msw';
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_fixtures/SuperadminSystemOpsMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMockHandlers owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_fixtures/SuperadminSystemOpsMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides MSW handlers for the System Ops summary feature and resettable fixture state.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';



let summaryState: SuperadminSystemOpsSummary = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };

export function resetSuperadminSystemOpsMockState(): void {
  summaryState = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };
}

export const superadminSystemOpsHandlers = [
  http.get(`*${MODULE_URLS.BACKEND_API.SUMMARY}`, () => HttpResponse.json({
    success: true,
    message: 'System Ops summary loaded.',
    data: summaryState,
  })),
];

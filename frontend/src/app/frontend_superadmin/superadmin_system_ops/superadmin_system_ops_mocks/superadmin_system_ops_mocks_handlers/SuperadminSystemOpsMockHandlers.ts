// RESPONSIBILITY: Provides MSW handlers for the System Ops summary feature and resettable fixture state.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_fixtures/SuperadminSystemOpsMockFixtures';
import { SuperadminSystemOpsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';

let summaryState: SuperadminSystemOpsSummary = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };

export function resetSuperadminSystemOpsMockState(): void {
  summaryState = { ...SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE };
}

export const superadminSystemOpsHandlers = [
  http.get(`*${SuperadminSystemOpsUrlConfig.API.SUMMARY}`, () => HttpResponse.json({
    success: true,
    message: 'System Ops summary loaded.',
    data: summaryState,
  })),
];

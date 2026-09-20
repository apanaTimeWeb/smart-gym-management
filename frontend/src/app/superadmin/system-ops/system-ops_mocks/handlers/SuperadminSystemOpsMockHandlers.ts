// RESPONSIBILITY: Provides MSW handlers for the System Ops summary feature and resettable fixture state.
import { http, HttpResponse } from 'msw';
import { SuperadminSystemOpsUrlConfig } from '@/app/superadmin/system-ops/superadmin_system_ops_url_config';
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/superadmin/system-ops/system-ops_mocks/fixtures/SuperadminSystemOpsMockFixtures';
import type { SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';

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

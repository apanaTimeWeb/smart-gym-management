import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsV1MockFixtures';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsConstants';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsV1MockHandlers owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, http-status-codes, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsV1MockFixtures, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsV1Types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers and mutable server-like state for the tenant business-controls feature.
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import { SuperadminGymsV1BulkMutationRequestSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsV1ContractSchemas';
import type { SuperadminGymsV1Data } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsV1Types';



let mockGymsBusinessControls: SuperadminGymsV1Data = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);

export function resetSuperadminGymsMockState(): void {
  mockGymsBusinessControls = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
}

function filterRows(rows: SuperadminGymsV1Data['rows'], filterKey: string): SuperadminGymsV1Data['rows'] {
  return rows.filter((row) => {
    switch (filterKey) {
      case 'active': return row.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE;
      case 'trial': return row.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL;
      case 'suspended': return row.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
      case 'high-income': return row.income >= 75000;
      case 'high-usage': return row.usage >= 90;
      case 'health-risk': return row.health < 70 || (row.income >= 50000 && row.health < 70);
      case 'payment-recovery': return row.paymentRecoveryOpen;
      default: return true;
    }
  });
}

export const superadminGymsV1Handlers = [
  http.get('*' + SUPERADMIN_GYMS_BUSINESS_CONTROLS.BACKEND_API.BASE, ({ request }) => {
    const filterKey = new URL(request.url).searchParams.get('filter') ?? 'all';
    const filteredRows = filterRows(mockGymsBusinessControls.rows, filterKey);
    return HttpResponse.json({ success: true, message: 'Tenant business-control data loaded.', data: { ...mockGymsBusinessControls, rows: filteredRows } });
  }),
  http.post('*' + SUPERADMIN_GYMS_BUSINESS_CONTROLS.BACKEND_API.BASE, async ({ request }) => {
    const parsed = SuperadminGymsV1BulkMutationRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return HttpResponse.json({ success: false, message: 'Bulk action payload is invalid.', data: null }, { status: StatusCodes.BAD_REQUEST });
    }
    const { action, gymIds, targetPlan } = parsed.data;
    const selected = new Set(gymIds);
    mockGymsBusinessControls = {
      ...mockGymsBusinessControls,
      rows: mockGymsBusinessControls.rows.map((row) => {
        if (!selected.has(row.id)) return row;
        if (action === 'Suspend selected') return { ...row, status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, lastAction: 'Tenant suspended' };
        if (action === 'Extend trial') return { ...row, trialDays: row.trialDays + 7, lastAction: 'Trial extended by 7 days' };
        if (action === 'Move plan') return { ...row, plan: targetPlan ?? row.plan, lastAction: `Plan moved to ${targetPlan ?? row.plan}` };
        if (action === 'Send message') return { ...row, lastAction: 'Message queued' };
        return { ...row, lastAction: 'Export prepared' };
      }),
    };
    return HttpResponse.json({ success: true, message: `Bulk action completed for ${gymIds.length} tenant${gymIds.length === 1 ? '' : 's'}.`, data: mockGymsBusinessControls });
  }),
];

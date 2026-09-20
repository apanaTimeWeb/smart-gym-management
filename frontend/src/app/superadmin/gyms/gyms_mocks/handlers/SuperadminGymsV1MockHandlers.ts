// RESPONSIBILITY: Owns MSW handlers and mutable server-like state for the tenant business-controls feature.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { SuperadminGymsV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_business_controls_url_config';
import {
  SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE,
} from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsV1MockFixtures';
import {
  SuperadminGymsV1BulkMutationRequestSchema,
  type SuperadminGymsV1Data,
} from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

let mockGymsBusinessControls: SuperadminGymsV1Data = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);

export function resetSuperadminGymsMockState(): void {
  mockGymsBusinessControls = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
}

function filterRows(rows: SuperadminGymsV1Data['rows'], filterKey: string): SuperadminGymsV1Data['rows'] {
  return rows.filter((row) => {
    switch (filterKey) {
      case 'active': return row.status === 'ACTIVE';
      case 'trial': return row.status === 'TRIAL';
      case 'suspended': return row.status === 'SUSPENDED';
      case 'high-income': return row.income >= 75000;
      case 'high-usage': return row.usage >= 90;
      case 'health-risk': return row.health < 70 || (row.income >= 50000 && row.health < 70);
      case 'payment-recovery': return row.paymentRecoveryOpen;
      default: return true;
    }
  });
}

export const superadminGymsV1Handlers = [
  http.get('*' + SuperadminGymsV1UrlConfig.BACKEND_API.BASE, ({ request }) => {
    const filterKey = new URL(request.url).searchParams.get('filter') ?? 'all';
    const filteredRows = filterRows(mockGymsBusinessControls.rows, filterKey);
    return HttpResponse.json({ success: true, message: 'Tenant business-control data loaded.', data: { ...mockGymsBusinessControls, rows: filteredRows } });
  }),
  http.post('*' + SuperadminGymsV1UrlConfig.BACKEND_API.BASE, async ({ request }) => {
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
        if (action === 'Suspend selected') return { ...row, status: 'SUSPENDED', lastAction: 'Tenant suspended' };
        if (action === 'Extend trial') return { ...row, trialDays: row.trialDays + 7, lastAction: 'Trial extended by 7 days' };
        if (action === 'Move plan') return { ...row, plan: targetPlan ?? row.plan, lastAction: `Plan moved to ${targetPlan ?? row.plan}` };
        if (action === 'Send message') return { ...row, lastAction: 'Message queued' };
        return { ...row, lastAction: 'Export prepared' };
      }),
    };
    return HttpResponse.json({ success: true, message: `Bulk action completed for ${gymIds.length} tenant${gymIds.length === 1 ? '' : 's'}.`, data: mockGymsBusinessControls });
  }),
];

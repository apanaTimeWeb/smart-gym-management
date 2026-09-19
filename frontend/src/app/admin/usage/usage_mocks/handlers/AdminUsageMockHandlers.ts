// RESPONSIBILITY: Owns MSW handlers for the Admin Usage workflow.
// DATA FLOW: Usage API client → module-owned MSW handler → module-owned fixture/state → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_USAGE_DATA } from '@/app/admin/usage/usage_mocks/fixtures/AdminUsageMockFixtures';
import type { AdminUsageUpgradeRequest } from '@/app/admin/usage/usage_types/AdminUsageUpgradeTypes';

let latestUpgradeRequest: AdminUsageUpgradeRequest | null = null;

export const adminUsageMockHandlers = [
  http.get('*/admin/usage', () => HttpResponse.json({
    success: true,
    message: 'Usage data loaded',
    data: MOCK_ADMIN_USAGE_DATA,
  })),
  http.post('*/admin/usage/upgrade-request', async ({ request }) => {
    const body = await request.json().catch(() => null) as unknown;
    const planName =
      typeof body === 'object' && body !== null && 'planName' in body && typeof (body as { planName?: unknown }).planName === 'string'
        ? (body as { planName: string }).planName
        : '';

    if (!planName) {
      return HttpResponse.json({ success: false, message: 'A plan must be selected.', data: null }, { status: StatusCodes.BAD_REQUEST });
    }

    latestUpgradeRequest = {
      requestId: `upgrade-${Date.now()}`,
      planName,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      success: true,
      message: `Upgrade request for ${planName} sent to Superadmin.`,
      data: latestUpgradeRequest,
    });
  }),
];

export function getAdminUsageMockUpgradeRequest(): AdminUsageUpgradeRequest | null {
  return latestUpgradeRequest;
}

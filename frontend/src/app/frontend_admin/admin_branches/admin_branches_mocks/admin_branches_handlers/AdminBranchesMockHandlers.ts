// RESPONSIBILITY: Owns MSW handlers for the Admin branches feature.
// DATA FLOW: Admin Branches API → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { ADMIN_BRANCHES_ROUTES, ADMIN_BRANCHES_API } from '@/app/frontend_admin/admin_branches/admin_branches_url_config';
import { MOCK_BRANCHES } from '@/app/frontend_admin/admin_branches/admin_branches_mocks/admin_branches_fixtures/AdminBranchesMockFixtures';
import { BRANCH_TIME_RANGE_MULTIPLIERS } from '@/app/frontend_admin/admin_branches/admin_branches_mocks/admin_branches_fixtures/AdminBranchesMockConstants';
import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesTimeRangeTypes';

/**
 * scaleBranch is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function scaleBranch(branch: typeof MOCK_BRANCHES[number], multiplier: number) {
  return { ...branch, revenue: Math.round(branch.revenue * multiplier), expenses: Math.round(branch.expenses * multiplier) };
}

export const adminBranchesMockHandlers = [
  http.get(`*${ADMIN_BRANCHES_API.base}`, ({ request }) => {
    const url = new URL(request.url);
    const range = (url.searchParams.get('range') ?? 'monthly') as AdminBranchesTimeRange;
    const multiplier = BRANCH_TIME_RANGE_MULTIPLIERS[range] ?? BRANCH_TIME_RANGE_MULTIPLIERS.monthly;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_BRANCHES.map((branch) => scaleBranch(branch, multiplier)) });
  }),
  http.get(`*${ADMIN_BRANCHES_ROUTES.root}/:branchId`, ({ params }) => {
    const branch = MOCK_BRANCHES.find((item) => item.id === String(params.branchId));
    if (!branch) return HttpResponse.json({ success: false, message: 'Branch not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Branch detail loaded', data: branch });
  }),
];

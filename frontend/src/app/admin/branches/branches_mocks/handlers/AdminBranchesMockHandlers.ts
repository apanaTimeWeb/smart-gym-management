// RESPONSIBILITY: Owns MSW handlers for the Admin branches feature.
// DATA FLOW: Admin Branches API → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { AdminBranchesUrlConfig } from '@/app/admin/branches/admin_branches_url_config';
import { MOCK_BRANCHES } from '@/app/admin/branches/branches_mocks/fixtures/AdminBranchesMockFixtures';
import { BRANCH_TIME_RANGE_MULTIPLIERS } from '@/app/admin/branches/branches_mocks/fixtures/AdminBranchesMockConstants';
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';

function scaleBranch(branch: typeof MOCK_BRANCHES[number], multiplier: number) {
  return { ...branch, revenue: Math.round(branch.revenue * multiplier), expenses: Math.round(branch.expenses * multiplier) };
}

export const adminBranchesMockHandlers = [
  http.get(`*${AdminBranchesUrlConfig.api.base}`, ({ request }) => {
    const url = new URL(request.url);
    const range = (url.searchParams.get('range') ?? 'monthly') as AdminBranchesTimeRange;
    const multiplier = BRANCH_TIME_RANGE_MULTIPLIERS[range] ?? BRANCH_TIME_RANGE_MULTIPLIERS.monthly;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_BRANCHES.map((branch) => scaleBranch(branch, multiplier)) });
  }),
  http.get(`*${AdminBranchesUrlConfig.root}/:branchId`, ({ params }) => {
    const branch = MOCK_BRANCHES.find((item) => item.id === String(params.branchId));
    if (!branch) return HttpResponse.json({ success: false, message: 'Branch not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Branch detail loaded', data: branch });
  }),
];

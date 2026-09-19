// RESPONSIBILITY: Owns the MSW handler for server-driven branch comparison filters and periods.
import { http, HttpResponse } from 'msw';
import { SuperadminBranchesV1UrlConfig } from '@/app/superadmin/branches/superadmin_branches_comparison_url_config';
import { SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/branches/branches_mocks/fixtures/SuperadminBranchesV1MockFixtures';

const PERIOD_MULTIPLIERS: Record<string, { income: number; members: number; growth: number }> = {
  '30d': { income: 0.96, members: 0.94, growth: 1 },
  '90d': { income: 1, members: 1, growth: 0.85 },
  '12m': { income: 1.11, members: 1.08, growth: 1.22 },
};

export const superadminBranchesV1Handlers = [
  http.get('*' + SuperadminBranchesV1UrlConfig.BACKEND_API.BASE, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const filterKey = params.get('filter') ?? 'all';
    const periodKey = params.get('period') ?? '30d';
    const multiplier = PERIOD_MULTIPLIERS[periodKey] ?? { income: 1, members: 1, growth: 1 };
    const branches = SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE.branches.filter((branch) => {
      if (filterKey === 'healthy') return branch.health >= 85;
      if (filterKey === 'attention') return branch.health < 75;
      if (filterKey === 'growing') return branch.growth > 0;
      if (filterKey === 'high-income') return branch.income >= 60000;
      if (filterKey === 'high-members') return branch.members >= 1200;
      return true;
    }).map((branch) => ({
      ...branch,
      income: Math.round(branch.income * multiplier.income),
      members: Math.round(branch.members * multiplier.members),
      growth: Number((branch.growth * multiplier.growth).toFixed(1)),
    }));
    return HttpResponse.json({ success: true, message: 'Branch comparison data loaded.', data: { ...SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE, branches } });
  }),
];

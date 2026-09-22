// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for DashboardFetchDashboardStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> DashboardFetchDashboardStatsService.fetchDashboardStats -> observable return/delegation.
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/manager/dashboard/services/dashboard-fetch-dashboard-stats.service';

describe('DashboardFetchDashboardStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'dashboard' } as const;
    const dependency = { fetchDashboardStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new DashboardFetchDashboardStatsService(dependency as never);
    const result = await service.fetchDashboardStats({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchDashboardStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});

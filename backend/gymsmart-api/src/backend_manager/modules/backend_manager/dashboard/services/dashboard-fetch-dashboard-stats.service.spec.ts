// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { DashboardFetchDashboardStatsService } from '@/backend_manager/modules/backend_manager/dashboard/services/dashboard-fetch-dashboard-stats.service';

describe('DashboardFetchDashboardStatsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findDashboardList: jest.fn().mockResolvedValue(expected) };
    const service = new DashboardFetchDashboardStatsService(dependency as never);
    const result = await service.fetchDashboardStats({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findDashboardList).toHaveBeenCalledTimes(1);
    expect(dependency.findDashboardList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findDashboardList: jest.fn().mockRejectedValue(failure) };
    const service = new DashboardFetchDashboardStatsService(dependency as never);
    await expect(service.fetchDashboardStats({} as never)).rejects.toBe(failure);
    expect(dependency.findDashboardList).toHaveBeenCalledTimes(1);
  });
});

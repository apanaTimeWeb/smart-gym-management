// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerDashboardFindDashboardChartsService } from '@/backend_manager/manager_modules/dashboard/dashboard_services/manager-dashboard-find-dashboard-charts.service';

describe('ManagerDashboardFindDashboardChartsService', () => {
  it('findDashboardCharts performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.findSnapshotPayload = jest.fn().mockResolvedValue(expected);
    const service = new ManagerDashboardFindDashboardChartsService(repositoryDependency);
    const result = await service.findDashboardCharts();
    expect(result).toEqual(expected);
    expect(repositoryDependency.findSnapshotPayload).toHaveBeenCalled();
  });

  it('findDashboardCharts propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.findSnapshotPayload = jest.fn().mockRejectedValue(failure);
    const service = new ManagerDashboardFindDashboardChartsService(repositoryDependency);
    await expect(service.findDashboardCharts()).rejects.toBe(failure);
    expect(repositoryDependency.findSnapshotPayload).toHaveBeenCalled();
  });
});

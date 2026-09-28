// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-find-maintenance-issues.service';

describe('ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService', () => {
  it('findMaintenanceIssues performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.findAll = jest.fn().mockResolvedValue(expected);
    const service = new ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService(repositoryDependency);
    const result = await service.findMaintenanceIssues({} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.findAll).toHaveBeenCalled();
  });

  it('findMaintenanceIssues propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.findAll = jest.fn().mockRejectedValue(failure);
    const service = new ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService(repositoryDependency);
    await expect(service.findMaintenanceIssues({} as never)).rejects.toBe(failure);
    expect(repositoryDependency.findAll).toHaveBeenCalled();
  });
});

// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-find-grievance-tickets.service';

describe('ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService', () => {
  it('findGrievanceTickets performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.findAll = jest.fn().mockResolvedValue(expected);
    const service = new ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService(repositoryDependency);
    const result = await service.findGrievanceTickets({} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.findAll).toHaveBeenCalled();
  });

  it('findGrievanceTickets propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.findAll = jest.fn().mockRejectedValue(failure);
    const service = new ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService(repositoryDependency);
    await expect(service.findGrievanceTickets({} as never)).rejects.toBe(failure);
    expect(repositoryDependency.findAll).toHaveBeenCalled();
  });
});

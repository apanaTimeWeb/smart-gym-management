// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-resolve-grievance-ticket.service';

describe('ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService', () => {
  it('updateGrievanceTicket performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const orchestratorDependency: any = {};
    orchestratorDependency.updateGrievance = jest.fn().mockResolvedValue(expected);
    const service = new ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService(orchestratorDependency);
    const result = await service.updateGrievanceTicket({} as never, '00000000-0000-4000-8000-000000000001');
    expect(result).toEqual(expected);
    expect(orchestratorDependency.updateGrievance).toHaveBeenCalled();
  });

  it('updateGrievanceTicket propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const orchestratorDependency: any = {};
    orchestratorDependency.updateGrievance = jest.fn().mockRejectedValue(failure);
    const service = new ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService(orchestratorDependency);
    await expect(service.updateGrievanceTicket({} as never, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(orchestratorDependency.updateGrievance).toHaveBeenCalled();
  });
});

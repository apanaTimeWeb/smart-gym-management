// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-create-grievance-ticket.service';

describe('ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService', () => {
  it('createGrievanceTicket performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const orchestratorDependency: any = {};
    orchestratorDependency.createGrievance = jest.fn().mockResolvedValue(expected);
    const service = new ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService(orchestratorDependency);
    const result = await service.createGrievanceTicket({} as never);
    expect(result).toEqual(expected);
    expect(orchestratorDependency.createGrievance).toHaveBeenCalled();
  });

  it('createGrievanceTicket propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const orchestratorDependency: any = {};
    orchestratorDependency.createGrievance = jest.fn().mockRejectedValue(failure);
    const service = new ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService(orchestratorDependency);
    await expect(service.createGrievanceTicket({} as never)).rejects.toBe(failure);
    expect(orchestratorDependency.createGrievance).toHaveBeenCalled();
  });
});

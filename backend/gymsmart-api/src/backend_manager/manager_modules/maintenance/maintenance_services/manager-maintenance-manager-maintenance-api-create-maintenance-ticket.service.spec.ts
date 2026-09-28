// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-create-maintenance-ticket.service';

describe('ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService', () => {
  it('createMaintenanceTicket performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const orchestratorDependency: any = {};
    orchestratorDependency.createMaintenance = jest.fn().mockResolvedValue(expected);
    const service = new ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService(orchestratorDependency);
    const result = await service.createMaintenanceTicket({} as never);
    expect(result).toEqual(expected);
    expect(orchestratorDependency.createMaintenance).toHaveBeenCalled();
  });

  it('createMaintenanceTicket propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const orchestratorDependency: any = {};
    orchestratorDependency.createMaintenance = jest.fn().mockRejectedValue(failure);
    const service = new ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService(orchestratorDependency);
    await expect(service.createMaintenanceTicket({} as never)).rejects.toBe(failure);
    expect(orchestratorDependency.createMaintenance).toHaveBeenCalled();
  });
});

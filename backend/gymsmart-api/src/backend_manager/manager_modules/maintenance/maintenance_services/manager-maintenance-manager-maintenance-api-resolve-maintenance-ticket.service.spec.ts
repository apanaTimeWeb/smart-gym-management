// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';

describe('ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService', () => {
  it('updateMaintenanceTicket performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const orchestratorDependency: any = {};
    orchestratorDependency.updateMaintenance = jest.fn().mockResolvedValue(expected);
    const service = new ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService(orchestratorDependency);
    const result = await service.updateMaintenanceTicket({} as never, '00000000-0000-4000-8000-000000000001');
    expect(result).toEqual(expected);
    expect(orchestratorDependency.updateMaintenance).toHaveBeenCalled();
  });

  it('updateMaintenanceTicket propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const orchestratorDependency: any = {};
    orchestratorDependency.updateMaintenance = jest.fn().mockRejectedValue(failure);
    const service = new ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService(orchestratorDependency);
    await expect(service.updateMaintenanceTicket({} as never, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(orchestratorDependency.updateMaintenance).toHaveBeenCalled();
  });
});

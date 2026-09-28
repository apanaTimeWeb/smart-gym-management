// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerScheduleMutationService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-mutation.service';

describe('ManagerScheduleMutationService', () => {
  it('createShift performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    const result = await service.createShift({} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createShift propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    await expect(service.createShift({} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
  });
  it('updateShift performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    const result = await service.updateShift('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('updateShift propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    await expect(service.updateShift('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
  });
  it('deleteShift performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    const result = await service.deleteShift('00000000-0000-4000-8000-000000000001', {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('deleteShift propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createShift = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerScheduleMutationService(repositoryDependency, auditDependency);
    await expect(service.deleteShift('00000000-0000-4000-8000-000000000001', {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createShift).toHaveBeenCalled();
  });
});

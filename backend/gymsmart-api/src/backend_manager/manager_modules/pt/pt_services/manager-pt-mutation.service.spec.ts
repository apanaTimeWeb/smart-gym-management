// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerPtMutationService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mutation.service';

describe('ManagerPtMutationService', () => {
  it('createAssignment performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    const result = await service.createAssignment({} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createAssignment propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    await expect(service.createAssignment({} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
  });
  it('updateAssignment performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    const result = await service.updateAssignment('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('updateAssignment propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    await expect(service.updateAssignment('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
  });
  it('deleteAssignment performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    const result = await service.deleteAssignment('00000000-0000-4000-8000-000000000001', {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('deleteAssignment propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createAssignment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPtMutationService(repositoryDependency, auditDependency);
    await expect(service.deleteAssignment('00000000-0000-4000-8000-000000000001', {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createAssignment).toHaveBeenCalled();
  });
});

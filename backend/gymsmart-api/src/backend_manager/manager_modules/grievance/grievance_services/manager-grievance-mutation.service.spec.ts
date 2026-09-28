// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerGrievanceMutationService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-mutation.service';

describe('ManagerGrievanceMutationService', () => {
  it('createGrievance performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    const result = await service.createGrievance({} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createGrievance propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    await expect(service.createGrievance({} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
  });
  it('updateGrievance performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    const result = await service.updateGrievance('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('updateGrievance propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    await expect(service.updateGrievance('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
  });
  it('deleteGrievance performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    const result = await service.deleteGrievance('00000000-0000-4000-8000-000000000001', {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('deleteGrievance propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createGrievance = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerGrievanceMutationService(repositoryDependency, auditDependency);
    await expect(service.deleteGrievance('00000000-0000-4000-8000-000000000001', {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createGrievance).toHaveBeenCalled();
  });
});

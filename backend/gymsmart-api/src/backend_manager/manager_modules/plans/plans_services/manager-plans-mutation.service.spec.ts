// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerPlansMutationService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-mutation.service';

describe('ManagerPlansMutationService', () => {
  it('createPlan performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    const result = await service.createPlan({} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createPlan propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    await expect(service.createPlan({} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
  });
  it('updatePlan performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    const result = await service.updatePlan('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('updatePlan propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    await expect(service.updatePlan('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
  });
  it('deletePlan performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    const result = await service.deletePlan('00000000-0000-4000-8000-000000000001', {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('deletePlan propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createPlan = jest.fn().mockRejectedValue(failure);
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerPlansMutationService(repositoryDependency, auditDependency);
    await expect(service.deletePlan('00000000-0000-4000-8000-000000000001', {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createPlan).toHaveBeenCalled();
  });
});

// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerMembersMutationService } from '@/backend_manager/manager_modules/members/members_services/manager-members-mutation.service';

describe('ManagerMembersMutationService', () => {
  it('createMember performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.createMember = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    const result = await service.createMember({} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
    expect(repositoryDependency.createMember).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createMember propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.createMember = jest.fn();
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    await expect(service.createMember({} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
  });
  it('updateMember performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.createMember = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    const result = await service.updateMember('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
    expect(repositoryDependency.createMember).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('updateMember propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.createMember = jest.fn();
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    await expect(service.updateMember('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
  });
  it('deleteMember performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.createMember = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    const result = await service.deleteMember('00000000-0000-4000-8000-000000000001', {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
    expect(repositoryDependency.createMember).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('deleteMember propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.createMember = jest.fn();
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    await expect(service.deleteMember('00000000-0000-4000-8000-000000000001', {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
  });
  it('createMemberPayment performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockResolvedValue(expected);
    repositoryDependency.createMember = jest.fn().mockResolvedValue(expected);
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    repositoryDependency.softDelete = jest.fn().mockResolvedValue(expected);
    repositoryDependency.updateById = jest.fn().mockResolvedValue(expected);
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    const result = await service.createMemberPayment('00000000-0000-4000-8000-000000000001', {} as never, {} as never);
    expect(result).toEqual(expected);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
    expect(repositoryDependency.createMember).toHaveBeenCalled();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(repositoryDependency.softDelete).toHaveBeenCalled();
    expect(repositoryDependency.updateById).toHaveBeenCalled();
    expect(auditDependency.append).toHaveBeenCalled();
  });

  it('createMemberPayment propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.createMemberPayment = jest.fn().mockRejectedValue(failure);
    repositoryDependency.createMember = jest.fn();
    repositoryDependency.findByIdOrThrow = jest.fn();
    repositoryDependency.softDelete = jest.fn();
    repositoryDependency.updateById = jest.fn();
    const auditDependency: any = {};
    auditDependency.append = jest.fn();
    const service = new ManagerMembersMutationService(repositoryDependency, auditDependency);
    await expect(service.createMemberPayment('00000000-0000-4000-8000-000000000001', {} as never, {} as never)).rejects.toBe(failure);
    expect(repositoryDependency.createMemberPayment).toHaveBeenCalled();
  });
});

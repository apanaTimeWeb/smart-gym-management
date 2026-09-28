// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerLibraryAuthorizationService } from '@/backend_manager/manager_modules/library/library_services/manager-library-authorization.service';

describe('ManagerLibraryAuthorizationService', () => {
  it('assertCanAccess performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const repositoryDependency: any = {};
    repositoryDependency.findByIdOrThrow = jest.fn().mockResolvedValue(expected);
    const contextDependency: any = {};
    contextDependency.get = jest.fn().mockReturnValue(context);
    const service = new ManagerLibraryAuthorizationService(repositoryDependency, contextDependency);
    const result = await service.assertCanAccess('00000000-0000-4000-8000-000000000001');
    expect(result).toBeUndefined();
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
    expect(contextDependency.get).toHaveBeenCalled();
  });

  it('assertCanAccess propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const repositoryDependency: any = {};
    repositoryDependency.findByIdOrThrow = jest.fn().mockRejectedValue(failure);
    const contextDependency: any = {};
    contextDependency.get = jest.fn().mockReturnValue({ tenantId: 'tenant-1', branchId: 'branch-1' });
    const service = new ManagerLibraryAuthorizationService(repositoryDependency, contextDependency);
    await expect(service.assertCanAccess('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(repositoryDependency.findByIdOrThrow).toHaveBeenCalled();
  });
  it('rejects a resource outside the actor branch', async () => {
    const repository = { findByIdOrThrow: jest.fn().mockResolvedValue({ tenantId: 'tenant-1', branchId: 'branch-2' }) };
    const context = { get: jest.fn().mockReturnValue({ tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' }) };
    const service = new ManagerLibraryAuthorizationService(repository as never, context as never);
    const resourceId = '00000000-0000-4000-8000-000000000001';

    try {
      await service.assertCanAccess(resourceId);
      throw new Error('Expected a branch authorization rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as { getResponse?: () => unknown }).getResponse?.()).toEqual(
        expect.objectContaining({ errorCode: 'AUTH.RESOURCE.BRANCH_FORBIDDEN' }),
      );
    }
  });

});

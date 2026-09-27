// RESPONSIBILITY: Verifies the global resource authorization guard, including body/query resource sources.
// FLOW: Synthetic ExecutionContext -> reflected resource metadata -> registered authorizer -> allow/deny.
import { Reflector } from '@nestjs/core';
import { ManagerCoreResourceAuthorizationGuard } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.guard';
import { MANAGER_CORE_RESOURCE_AUTHORIZATION } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

describe('ManagerCoreResourceAuthorizationGuard', () => {
  const makeContext = (request: Record<string, unknown>, handlerMetadata: unknown) => ({
    switchToHttp: () => ({ getRequest: () => request }),
    getHandler: () => 'handler',
    getClass: () => 'class',
    __handlerMetadata: handlerMetadata,
  });

  it('authorizes a route param resource', async () => {
    const request = { params: { id: 'member-1' }, path: '/manager/members/member-1', route: { path: '/manager/members/:id' } };
    const authorizer = { assertCanAccess: jest.fn().mockResolvedValue(undefined) };
    const registry = { get: jest.fn().mockReturnValue(authorizer) };
    const reflector = new Reflector();
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue({ source: 'params', field: 'id' } as never);
    const moduleRef = { get: jest.fn().mockReturnValue(authorizer) };
    const guard = new ManagerCoreResourceAuthorizationGuard(moduleRef as never, registry as never, reflector);
    await expect(guard.canActivate(makeContext(request, null) as never)).resolves.toBe(true);
    expect(authorizer.assertCanAccess).toHaveBeenCalledWith('member-1');
  });

  it('authorizes a body resource field', async () => {
    const request = { body: { staffId: 'staff-1' }, path: '/manager/hr/ledger/advance', route: { path: '/manager/hr/ledger/advance' } };
    const authorizer = { assertCanAccess: jest.fn().mockResolvedValue(undefined) };
    const registry = { get: jest.fn().mockReturnValue(authorizer) };
    const reflector = new Reflector();
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue({ source: 'body', field: 'staffId' } as never);
    const moduleRef = { get: jest.fn().mockReturnValue(authorizer) };
    const guard = new ManagerCoreResourceAuthorizationGuard(moduleRef as never, registry as never, reflector);
    await expect(guard.canActivate(makeContext(request, null) as never)).resolves.toBe(true);
    expect(authorizer.assertCanAccess).toHaveBeenCalledWith('staff-1');
  });
});


it('routes an explicitly foreign resource identifier to the declared resource feature authorizer', async () => {
  const memberAuthorizer = { assertCanAccess: jest.fn().mockResolvedValue(undefined) };
  const registry = { get: jest.fn((feature: string) => feature === 'members' ? memberAuthorizer : undefined) };
  const reflector = { getAllAndOverride: jest.fn().mockReturnValue({ source: 'params', field: 'memberId', resourceFeature: 'members' }) };
  const moduleRef = { get: jest.fn() };
  const guard = new ManagerCoreResourceAuthorizationGuard(moduleRef as never, registry as never, reflector as never);
  const executionContext = { switchToHttp: () => ({ getRequest: () => ({ params: { memberId: 'member-1' }, route: { path: '/manager/finance/payments/member/:memberId' }, path: '/manager/finance/payments/member/member-1' }) }), getHandler: () => ({}), getClass: () => ({}) } as never;
  await expect(guard.canActivate(executionContext)).resolves.toBe(true);
  expect(memberAuthorizer.assertCanAccess).toHaveBeenCalledWith('member-1');
});

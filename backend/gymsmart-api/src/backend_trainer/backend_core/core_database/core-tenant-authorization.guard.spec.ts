// RESPONSIBILITY: Proves tenant authorization reads membership before trusting tenant context.
// FLOW: Jest → mocked master membership repository → guard → scoped CoreRequestContext.

import { ExecutionContext } from '@nestjs/common';
import { CoreTenantAuthorizationGuard } from '@/backend_trainer/backend_core/core_database/core-tenant-authorization.guard';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';

const reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) } as never;

describe('CoreTenantAuthorizationGuard', () => {
  it('writes only the authorized tenant after master membership lookup', async () => {
    const findActiveMembership = jest.fn().mockResolvedValue({ tenantId: 'tenant-1', role: CoreRole.TRAINER });
    const guard = new CoreTenantAuthorizationGuard({ findActiveMembership } as unknown as CoreTenantMembershipAuthorizationRepository, reflector);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ header: () => 'tenant-1' }) }),
    } as unknown as ExecutionContext;

    await CoreRequestContext.run({ requestId: 'req-1', userId: 'user-1' }, async () => {
      await expect(guard.canActivate(context)).resolves.toBe(true);
      expect(findActiveMembership).toHaveBeenCalledWith('user-1', 'tenant-1');
      expect(CoreRequestContext.get().tenantId).toBe('tenant-1');
      expect(CoreRequestContext.get().role).toBe(CoreRole.TRAINER);
    });
  });
});

// RESPONSIBILITY: Proves canonical response wrapping and role-aware sensitive field serialization.
// FLOW: Controller result → ManagerCoreResponseInterceptor → role policy → canonical ApiResponse.
import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { ManagerCoreResponseInterceptor } from '@/backend_manager/manager_core/manager_core_http/manager-core-response.interceptor';

import { lastValueFrom, of } from 'rxjs';

describe('ManagerCoreResponseInterceptor', () => {
  const execute = async (role: ManagerCoreRole, handlerMetadata: string[] | undefined, result: unknown): Promise<unknown> => {
    const reflector = {
      getAllAndOverride: jest.fn((key: string) => {
        if (key === 'core_raw_response') return false;
        if (key === 'core_expose_sensitive_fields') return handlerMetadata;
        return undefined;
      }),
    };
    const trustedContext = { get: () => ({ actorRole: role, requestId: 'r1', traceId: 't1', spanId: 's1' }) };
    const interceptor = new ManagerCoreResponseInterceptor(reflector as never, trustedContext as never);
    const context = {
      switchToHttp: () => ({ getRequest: () => ({}) }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as never;
    return lastValueFrom(interceptor.intercept(context, { handle: () => of(result) } as never));
  };

  it('removes sensitive fields unless both the role and endpoint permit them', async () => {
    const denied = await execute(ManagerCoreRole.MANAGER, undefined, { id: 'member-1', aadhaar: 'secret', name: 'Member' });
    expect(denied).toEqual({ success: true, message: 'Request completed successfully', data: { id: 'member-1', name: 'Member' } });

    const allowed = await execute(ManagerCoreRole.MANAGER, ['aadhaar'], { id: 'member-1', aadhaar: 'secret', name: 'Member' });
    expect(allowed).toEqual({ success: true, message: 'Request completed successfully', data: { id: 'member-1', aadhaar: 'secret', name: 'Member' } });
  });

  it('does not expose role-authorized sensitive fields to a role without policy access', async () => {
    const response = await execute(ManagerCoreRole.STAFF, ['aadhaar'], { id: 'member-1', aadhaar: 'secret' });
    expect(response).toEqual({ success: true, message: 'Request completed successfully', data: { id: 'member-1' } });
  });
});

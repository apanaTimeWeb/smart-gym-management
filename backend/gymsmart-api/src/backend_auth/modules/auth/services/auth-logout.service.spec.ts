// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
import { AuthLogoutService } from '@/backend_auth/modules/auth/services/auth-logout.service';
describe('AuthLogoutService', () => {
  it('revokes the verified session and writes a logout audit record', async () => {
    const sessionRepository = { revokeRefreshSession: jest.fn().mockResolvedValue(undefined) };
    const audit = { record: jest.fn().mockResolvedValue(undefined), getRequestMetadata: jest.fn().mockReturnValue({ ipAddress: '203.0.113.10' }) };
    const service = new AuthLogoutService(sessionRepository as never, audit as never);

    await service.logout('user-1', AuthRole.SUPERADMIN, 'session-1');

    expect(sessionRepository.revokeRefreshSession).toHaveBeenCalledWith('session-1');
    expect(audit.record).toHaveBeenCalledWith(expect.objectContaining({ action: 'AUTH.LOGOUT.SUCCESS', actorRole: expect.anything(), ipAddress: '203.0.113.10' }));
  });
});

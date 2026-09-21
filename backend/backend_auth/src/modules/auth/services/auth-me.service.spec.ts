// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { AuthRole } from '@/modules/auth/auth.roles.constants';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
describe('AuthMeService', () => {
  it('returns the authoritative repository identity for the verified subject', async () => {
    const user = { id: 'user-1', name: 'Admin', email: 'admin@example.com', role: AuthRole.ADMIN };
    const repository = { findUserByIdOrThrow: jest.fn().mockResolvedValue(user) };
    const service = new AuthMeService(repository as never);

    await expect(service.findAuthenticatedUserById('user-1')).resolves.toEqual(user);
    expect(repository.findUserByIdOrThrow).toHaveBeenCalledWith('user-1');
  });
});

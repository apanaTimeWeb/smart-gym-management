// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { AuthCommandController } from '@/backend_auth/modules/auth/controllers/auth-command.controller';
import { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
describe('AuthCommandController', () => {
  it('delegates login to the session orchestrator and maps the domain result', async () => {
    const result = {
      accessToken: 'access',
      refreshToken: 'refresh',
      user: { id: 'user-1', name: 'Admin', email: 'admin@example.com', role: AuthRole.ADMIN },
    };
    const orchestrator = { login: jest.fn().mockResolvedValue(result) };
    const controller = new AuthCommandController(orchestrator as never);

    await expect(controller.login({ email: 'admin@example.com', password: 'Secret123' })).resolves.toEqual(result);
    expect(orchestrator.login).toHaveBeenCalledWith('admin@example.com', 'Secret123');
  });
});

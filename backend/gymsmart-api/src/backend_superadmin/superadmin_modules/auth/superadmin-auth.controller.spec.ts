// RESPONSIBILITY: Tests the auth controller contract and HTTP-facing behavior only.
// FLOW: Unit test -> mocked auth service -> controller response assertions.
import { SuperadminAuthController } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.controller';

describe('SuperadminAuthController ghost lifecycle', () => {
  it('sets a ghost cookie only after the handoff is verified', async () => {
    const service = { verifyGhostHandoff: jest.fn().mockResolvedValue({ exp: Math.floor(Date.now()/1000)+60 }) };
    const response = { cookie: jest.fn() };
    const controller = new SuperadminAuthController(service as never, { get: jest.fn().mockReturnValue(false) } as never);
    await controller.setGhostLoginCookie({ token: 'signed', refreshToken: 'signed', user: { id: 'u1', email: 'u@example.com', role: 'ADMIN', tenantId: 't1' } } as never, response as never);
    expect(service.verifyGhostHandoff).toHaveBeenCalledWith('signed');
    expect(response.cookie).toHaveBeenCalled();
  });
});

// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { AuthRefreshReuseDetectedException } from '@/modules/auth/auth.exceptions';
import { AuthSessionOrchestrator } from '@/modules/auth/orchestrators/auth-session.orchestrator';
it('commits refresh replay revocation after the failed rotation transaction', async () => {
  const transactions = {
    run: jest.fn()
      .mockImplementationOnce(async (callback: () => Promise<unknown>) => callback())
      .mockImplementationOnce(async (callback: () => Promise<unknown>) => callback()),
  };
  const refreshService = {
    refresh: jest.fn().mockRejectedValue(new AuthRefreshReuseDetectedException('user-1', 'session-1')),
  };
  const sessionRepository = { revokeRefreshSession: jest.fn().mockResolvedValue(undefined) };
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const refreshRevocation = { revokeRefreshToken: jest.fn().mockResolvedValue(undefined) };
  const orchestrator = new AuthSessionOrchestrator(
    transactions as never,
    { login: jest.fn() } as never,
    refreshService as never,
    { logout: jest.fn() } as never,
    audit as never,
    sessionRepository as never,
    refreshRevocation as never,
  );

  await expect(orchestrator.refresh('replayed-token')).rejects.toBeInstanceOf(AuthRefreshReuseDetectedException);
  expect(transactions.run).toHaveBeenCalledTimes(2);
  expect(sessionRepository.revokeRefreshSession).toHaveBeenCalledWith('session-1');
  expect(audit.record).toHaveBeenCalledWith(expect.objectContaining({ action: 'AUTH.REFRESH.REUSE_DETECTED' }));
});

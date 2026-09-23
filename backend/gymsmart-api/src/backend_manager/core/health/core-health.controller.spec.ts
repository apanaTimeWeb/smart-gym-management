// RESPONSIBILITY: Owns backend core co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CoreHealthController } from '@/backend_manager/core/health/core-health.controller';

describe('CoreHealthController', () => {
  it('reports ready only when both database and Redis are reachable', async () => {
    const controller = new CoreHealthController({ query: jest.fn().mockResolvedValue([{ ok: 1 }]) } as never, { isReady: jest.fn().mockResolvedValue(true) } as never);
    await expect(controller.ready()).resolves.toEqual({ status: 'ok', dependencies: { database: true, redis: true } });
  });

  it('reports degraded when the database probe fails even when Redis is ready', async () => {
    const controller = new CoreHealthController({ query: jest.fn().mockRejectedValue(new Error('db down')) } as never, { isReady: jest.fn().mockResolvedValue(true) } as never);
    await expect(controller.ready()).resolves.toEqual({ status: 'degraded', dependencies: { database: false, redis: true } });
  });
});

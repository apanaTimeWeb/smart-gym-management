// RESPONSIBILITY: Owns backend core co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ManagerCoreHealthController } from '@/backend_manager/manager_core/manager_core_health/manager-core-health.controller';

describe('ManagerCoreHealthController', () => {
  it('reports ready only when both database and Redis are reachable', async () => {
    const controller = new ManagerCoreHealthController({ query: jest.fn().mockResolvedValue([{ ok: 1 }]) } as never, { isReady: jest.fn().mockResolvedValue(true) } as never);
    await expect(controller.ready()).resolves.toEqual({ status: 'ok', dependencies: { database: true, redis: true } });
  });

  it('reports degraded when the database probe fails even when Redis is ready', async () => {
    const controller = new ManagerCoreHealthController({ query: jest.fn().mockRejectedValue(new Error('db down')) } as never, { isReady: jest.fn().mockResolvedValue(true) } as never);
    await expect(controller.ready()).resolves.toEqual({ status: 'degraded', dependencies: { database: false, redis: true } });
  });
});

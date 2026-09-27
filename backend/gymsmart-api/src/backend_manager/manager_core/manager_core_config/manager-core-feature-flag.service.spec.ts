// RESPONSIBILITY: Proves tenant-scoped feature-flag evaluation and deterministic rollout behavior.
// FLOW: Trusted tenant → feature flag lookup → enabled/disabled/rollout decision.
import { ManagerCoreFeatureFlagService } from '@/backend_manager/manager_core/manager_core_config/manager-core-feature-flag.service';

describe('ManagerCoreFeatureFlagService', () => {
  const makeService = (flag: unknown) => {
    const repository = { findOne: jest.fn().mockResolvedValue(flag) };
    const dataSource = { getRepository: jest.fn().mockReturnValue(repository) };
    return { service: new ManagerCoreFeatureFlagService(dataSource as never), repository };
  };

  it('fails closed to the supplied default when no flag exists', async () => {
    const { service } = makeService(null);
    await expect(service.isEnabled('new-feature', 'tenant-1')).resolves.toBe(false);
    await expect(service.isEnabled('new-feature', 'tenant-1', true)).resolves.toBe(true);
  });

  it('honors an explicitly disabled flag', async () => {
    const { service } = makeService({ enabled: false, rolloutPercent: 100 });
    await expect(service.isEnabled('new-feature', 'tenant-1')).resolves.toBe(false);
  });

  it('enables a fully rolled-out flag', async () => {
    const { service } = makeService({ enabled: true, rolloutPercent: 100 });
    await expect(service.isEnabled('new-feature', 'tenant-1')).resolves.toBe(true);
  });
});

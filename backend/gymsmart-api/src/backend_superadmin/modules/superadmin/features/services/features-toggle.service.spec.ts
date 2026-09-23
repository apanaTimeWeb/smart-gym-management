// RESPONSIBILITY: Tests feature-flag toggle behavior and guardrails.
// FLOW: Unit test -> FeaturesToggleService -> mocked repository.
import { FeaturesToggleService } from '@/backend_superadmin/modules/superadmin/features/services/features-toggle.service';

describe('FeaturesToggleService', () => {
  it('toggles the flag through the named repository mutation', async () => {
    const repository = {
      findByIdOrThrow: jest.fn().mockResolvedValue({ id: 'f1', isGlobalEnabled: false, history: [] }),
      updateFeaturesById: jest.fn().mockResolvedValue({ id: 'f1', isGlobalEnabled: true, history: [] }),
    };
    const service = new FeaturesToggleService(repository as never, {} as never);
    const result = await service.toggleFeatures('f1');
    expect(repository.updateFeaturesById).toHaveBeenCalledWith('f1', expect.objectContaining({ isGlobalEnabled: true }));
    expect(result.id).toBe('f1');
  });
});
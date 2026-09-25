// RESPONSIBILITY: Tests feature-flag toggle behavior and guardrails.
// FLOW: Unit test -> SuperadminFeaturesToggleService -> mocked repository.
import { SuperadminFeaturesToggleService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-toggle.service';

describe('SuperadminFeaturesToggleService', () => {
  it('toggles the flag through the named repository mutation', async () => {
    const repository = {
      findByIdOrThrow: jest.fn().mockResolvedValue({ id: 'f1', isGlobalEnabled: false, history: [] }),
      updateFeaturesById: jest.fn().mockResolvedValue({ id: 'f1', isGlobalEnabled: true, history: [] }),
    };
    const service = new SuperadminFeaturesToggleService(repository as never, {} as never);
    const result = await service.toggleFeatures('f1');
    expect(repository.updateFeaturesById).toHaveBeenCalledWith('f1', expect.objectContaining({ isGlobalEnabled: true }));
    expect(result.id).toBe('f1');
  });
});

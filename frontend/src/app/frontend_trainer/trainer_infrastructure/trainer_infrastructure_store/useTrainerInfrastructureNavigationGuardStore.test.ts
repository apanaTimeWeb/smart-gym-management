import { describe, expect, it, beforeEach } from 'vitest';

import { useTrainerInfrastructureNavigationGuardStore } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_store/useTrainerInfrastructureNavigationGuardStore';




describe('useTrainerInfrastructureNavigationGuardStore', () => {
  beforeEach(() => {
    const store = useTrainerInfrastructureNavigationGuardStore.getState();
    Object.keys(store.dirtySources).forEach((sourceId) => store.setSourceDirty(sourceId, false));
  });

  it('tracks multiple dirty sources and clears individual sources without losing the remaining guard', () => {
    const store = useTrainerInfrastructureNavigationGuardStore.getState();
    expect(store.hasDirtySources()).toBe(false);

    store.setSourceDirty('form-a', true);
    store.setSourceDirty('form-b', true);
    expect(useTrainerInfrastructureNavigationGuardStore.getState().hasDirtySources()).toBe(true);

    store.setSourceDirty('form-a', false);
    expect(useTrainerInfrastructureNavigationGuardStore.getState().dirtySources).toEqual({ 'form-b': true });
    expect(useTrainerInfrastructureNavigationGuardStore.getState().hasDirtySources()).toBe(true);

    store.setSourceDirty('form-b', false);
    expect(useTrainerInfrastructureNavigationGuardStore.getState().hasDirtySources()).toBe(false);
  });
});

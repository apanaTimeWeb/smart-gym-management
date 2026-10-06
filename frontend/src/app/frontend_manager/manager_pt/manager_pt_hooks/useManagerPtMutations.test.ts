import * as moduleUnderTest from '@/app/frontend_manager/manager_pt/manager_pt_hooks/useManagerPtMutations';

describe('useManagerPtMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerPtMutations).toBe('function');
  });
});

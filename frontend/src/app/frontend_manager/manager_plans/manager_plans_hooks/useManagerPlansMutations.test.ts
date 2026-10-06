import * as moduleUnderTest from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansMutations';

describe('useManagerPlansMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerPlansMutations).toBe('function');
  });
});

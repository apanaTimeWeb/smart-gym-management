import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule/manager_schedule_hooks/useManagerScheduleMutations';

describe('useManagerScheduleMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerScheduleMutations).toBe('function');
  });
});

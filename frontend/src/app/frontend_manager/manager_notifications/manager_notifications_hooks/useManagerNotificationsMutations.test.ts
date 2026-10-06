import * as moduleUnderTest from '@/app/frontend_manager/manager_notifications/manager_notifications_hooks/useManagerNotificationsMutations';

describe('useManagerNotificationsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerNotificationsMutations).toBe('function');
  });
});

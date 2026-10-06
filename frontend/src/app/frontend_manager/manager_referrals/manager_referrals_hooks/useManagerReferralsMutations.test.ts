import * as moduleUnderTest from '@/app/frontend_manager/manager_referrals/manager_referrals_hooks/useManagerReferralsMutations';

describe('useManagerReferralsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerReferralsMutations).toBe('function');
  });
});

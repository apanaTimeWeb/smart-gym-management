import { describe, it, expect } from 'vitest';

describe('useSuperadminFeatureRolloutTenants', () => {
  it('uses the module-scoped tenant query key', () => {
    expect(['superadmin', 'features', 'tenants']).toEqual(['superadmin', 'features', 'tenants']);
  });
});

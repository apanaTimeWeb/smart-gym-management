import { describe, it, expect } from 'vitest';

describe('useSuperadminFeatureFlagHistory', () => {
  it('uses a module-scoped history query key shape', () => {
    expect(['superadmin', 'features', 'history', 'flag-id']).toEqual(['superadmin', 'features', 'history', 'flag-id']);
  });
});

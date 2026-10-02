import { describe, expect, it } from 'vitest';

import { useSuperadminFeaturesFilteredFlags } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFilteredFlags';


describe('useSuperadminFeaturesFilteredFlags', () => {
  it('filters by name and preserves matching flags', () => {
    const result = useSuperadminFeaturesFilteredFlags([
      { id: 'f1', name: 'Payments', isGlobalEnabled: true } as never,
      { id: 'f2', name: 'Analytics', isGlobalEnabled: false } as never,
    ] as never, 'pay');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'f1' });
  });
  it('returns all flags when search is blank', () => {
    const flags = [{ id: 'f1', name: 'Payments' } as never, { id: 'f2', name: 'Analytics' } as never] as never[];
    expect(useSuperadminFeaturesFilteredFlags(flags, '')).toHaveLength(2);
  });
});

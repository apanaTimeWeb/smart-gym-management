// DATA FLOW: API / URL state / module client state → useSuperadminFeaturesData → superadmin_features view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminFeaturesData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData';

describe('useSuperadminFeaturesData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeaturesData).toBe('function');
  });
});

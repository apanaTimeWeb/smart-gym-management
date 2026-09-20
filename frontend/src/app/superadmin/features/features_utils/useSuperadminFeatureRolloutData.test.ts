import { describe, expect, it } from 'vitest';
import { useSuperadminFeatureRolloutData } from '@/app/superadmin/features/features_utils/useSuperadminFeatureRolloutData.ts';

describe('useSuperadminFeatureRolloutData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeatureRolloutData).toBe('function');
  });
});

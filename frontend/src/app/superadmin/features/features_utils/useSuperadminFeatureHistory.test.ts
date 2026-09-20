import { describe, expect, it } from 'vitest';
import { useSuperadminFeatureHistory } from '@/app/superadmin/features/features_utils/useSuperadminFeatureHistory.ts';

describe('useSuperadminFeatureHistory', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeatureHistory).toBe('function');
  });
});

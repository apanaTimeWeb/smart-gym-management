import { describe, expect, it } from 'vitest';
import { useSuperadminFeaturesData } from '@/app/superadmin/features/features_utils/useSuperadminFeaturesData.ts';

describe('useSuperadminFeaturesData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeaturesData).toBe('function');
  });
});

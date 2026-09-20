import { describe, expect, it } from 'vitest';
import { useSuperadminFeaturesV1 } from '@/app/superadmin/features/features_utils/useSuperadminFeaturesV1.ts';

describe('useSuperadminFeaturesV1', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminFeaturesV1).toBe('function');
  });
});

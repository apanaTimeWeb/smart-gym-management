import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastsMutations } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsMutations.ts';

describe('useSuperadminBroadcastsMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastsMutations).toBe('function');
  });
});

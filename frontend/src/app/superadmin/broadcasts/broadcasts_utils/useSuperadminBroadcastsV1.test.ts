import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastsV1 } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsV1.ts';

describe('useSuperadminBroadcastsV1', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastsV1).toBe('function');
  });
});

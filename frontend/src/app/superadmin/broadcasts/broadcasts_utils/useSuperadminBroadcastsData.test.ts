import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastsData } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsData.ts';

describe('useSuperadminBroadcastsData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastsData).toBe('function');
  });
});

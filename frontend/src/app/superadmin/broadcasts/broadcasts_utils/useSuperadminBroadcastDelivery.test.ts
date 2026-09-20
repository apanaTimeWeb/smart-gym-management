import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastDelivery } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastDelivery.ts';

describe('useSuperadminBroadcastDelivery', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastDelivery).toBe('function');
  });
});

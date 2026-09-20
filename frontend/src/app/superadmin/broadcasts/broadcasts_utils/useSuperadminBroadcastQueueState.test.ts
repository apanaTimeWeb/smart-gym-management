import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastQueueState } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastQueueState.ts';

describe('useSuperadminBroadcastQueueState', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastQueueState).toBe('function');
  });
});

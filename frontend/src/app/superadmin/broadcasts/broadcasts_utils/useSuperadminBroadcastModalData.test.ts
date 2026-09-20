import { describe, expect, it } from 'vitest';
import { useSuperadminBroadcastModalData } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastModalData.ts';

describe('useSuperadminBroadcastModalData', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminBroadcastModalData).toBe('function');
  });
});

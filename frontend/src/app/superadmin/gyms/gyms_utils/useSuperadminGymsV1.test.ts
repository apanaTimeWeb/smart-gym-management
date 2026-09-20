import { describe, expect, it } from 'vitest';
import { useSuperadminGymsV1 } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymsV1.ts';

describe('useSuperadminGymsV1', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymsV1).toBe('function');
  });
});

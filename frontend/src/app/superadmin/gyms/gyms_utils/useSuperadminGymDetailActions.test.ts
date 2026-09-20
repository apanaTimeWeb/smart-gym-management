import { describe, expect, it } from 'vitest';
import { useSuperadminGymDetailActions } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailActions.ts';

describe('useSuperadminGymDetailActions', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymDetailActions).toBe('function');
  });
});

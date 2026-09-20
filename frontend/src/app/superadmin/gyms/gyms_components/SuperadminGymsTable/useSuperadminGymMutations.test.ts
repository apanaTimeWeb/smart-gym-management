import { describe, expect, it } from 'vitest';
import { useSuperadminGymMutations } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymMutations.ts';

describe('useSuperadminGymMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymMutations).toBe('function');
  });
});

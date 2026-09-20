import { describe, expect, it } from 'vitest';
import { useSuperadminGymEditModal } from '@/app/superadmin/gyms/gyms_components/SuperadminGymEditModal/useSuperadminGymEditModal.ts';

describe('useSuperadminGymEditModal', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymEditModal).toBe('function');
  });
});

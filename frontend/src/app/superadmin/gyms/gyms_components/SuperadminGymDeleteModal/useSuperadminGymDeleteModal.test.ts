import { describe, expect, it } from 'vitest';
import { useSuperadminGymDeleteModal } from '@/app/superadmin/gyms/gyms_components/SuperadminGymDeleteModal/useSuperadminGymDeleteModal.ts';

describe('useSuperadminGymDeleteModal', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymDeleteModal).toBe('function');
  });
});

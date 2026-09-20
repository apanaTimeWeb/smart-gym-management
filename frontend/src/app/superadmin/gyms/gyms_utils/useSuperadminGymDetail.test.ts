// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { useSuperadminGymDetail } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetail';


describe('useSuperadminGymDetail', () => {
  it('exports the hook as a callable contract', () => {
    expect(typeof useSuperadminGymDetail).toBe('function');
  });
});

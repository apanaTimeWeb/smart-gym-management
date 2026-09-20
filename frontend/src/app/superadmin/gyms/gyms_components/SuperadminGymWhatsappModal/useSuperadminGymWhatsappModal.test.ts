import { describe, expect, it } from 'vitest';
import { useSuperadminGymWhatsappModal } from '@/app/superadmin/gyms/gyms_components/SuperadminGymWhatsappModal/useSuperadminGymWhatsappModal.ts';

describe('useSuperadminGymWhatsappModal', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymWhatsappModal).toBe('function');
  });
});

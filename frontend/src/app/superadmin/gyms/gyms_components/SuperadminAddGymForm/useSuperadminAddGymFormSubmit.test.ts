import { describe, expect, it } from 'vitest';
import { useSuperadminAddGymFormSubmit } from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/useSuperadminAddGymFormSubmit.ts';

describe('useSuperadminAddGymFormSubmit', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminAddGymFormSubmit).toBe('function');
  });
});

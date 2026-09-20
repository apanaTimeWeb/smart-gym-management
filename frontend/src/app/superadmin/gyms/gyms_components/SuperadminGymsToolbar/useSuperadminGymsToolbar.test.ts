import { describe, expect, it } from 'vitest';
import { useSuperadminGymsToolbar } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsToolbar/useSuperadminGymsToolbar.ts';

describe('useSuperadminGymsToolbar', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymsToolbar).toBe('function');
  });
});

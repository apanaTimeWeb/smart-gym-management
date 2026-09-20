import { describe, expect, it } from 'vitest';
import { useSuperadminGymGhostLoginStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymGhostLoginStore.ts';

describe('useSuperadminGymGhostLoginStore', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymGhostLoginStore).toBe('function');
  });
});

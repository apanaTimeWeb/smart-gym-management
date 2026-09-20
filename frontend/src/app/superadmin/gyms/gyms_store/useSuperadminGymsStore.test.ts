import { describe, expect, it } from 'vitest';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore.ts';

describe('useSuperadminGymsStore', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGymsStore).toBe('function');
  });
});

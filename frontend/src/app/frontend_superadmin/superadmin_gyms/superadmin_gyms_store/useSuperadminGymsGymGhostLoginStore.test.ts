import { beforeEach, describe, expect, it } from 'vitest';

import { useSuperadminGymsGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore';



describe('useSuperadminGymsGymGhostLoginStore', () => {
  beforeEach(() => useSuperadminGymsGymGhostLoginStore.setState({ ghostTenant: null }));
  it('stores the selected tenant and clears it without touching server state', () => {
    const tenant = { id: 'gym-1', name: 'Gym Alpha', plan: 'PRO', adminEmail: 'admin@example.com' };
    useSuperadminGymsGymGhostLoginStore.getState().startGhostLogin(tenant);
    expect(useSuperadminGymsGymGhostLoginStore.getState().ghostTenant).toEqual(tenant);
    useSuperadminGymsGymGhostLoginStore.getState().clearGhostLogin();
    expect(useSuperadminGymsGymGhostLoginStore.getState().ghostTenant).toBeNull();
  });
});

import { create } from 'zustand';
import type { AdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_types/AdminGymHealthAlertsStoreTypes';
// RESPONSIBILITY: Owns only the Gym Health Alerts filter/search UI state; server results stay in TanStack Query.
/**
 * @description useAdminGymHealthAlertsStore: Owns only the Gym Health Alerts filter/search UI state; server results stay in TanStack Query.
 * @dependencies Consumes AdminGymHealthAlertsStoreTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminGymHealthAlertsStore = create<AdminGymHealthAlertsStore>((set) => ({
  severityFilter: 'all',
  search: '',
  setSeverityFilter: (severityFilter) => set({ severityFilter }),
  setSearch: (search) => set({ search }),
}));

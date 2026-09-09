/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: SuperadminGymsToolbar -> useSuperadminGymsToolbar -> useSuperadminGymsStore -> API
 */

/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: SuperadminGymsToolbar -> useSuperadminGymsToolbar -> useSuperadminGymsStore -> API
 */

// DATA FLOW: Component -> useSuperadminGymsToolbar.ts -> API/Store
import { useEffect, useState, useMemo } from 'react';

import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';

export function useSuperadminGymsToolbar() {
  const search = useSuperadminGymsStore(state => state.search);
  const setSearch = useSuperadminGymsStore(state => state.setSearch);
  const statusFilter = useSuperadminGymsStore(state => state.statusFilter);
  const setStatusFilter = useSuperadminGymsStore(state => state.setStatusFilter);
  const planFilter = useSuperadminGymsStore(state => state.planFilter);
  const setPlanFilter = useSuperadminGymsStore(state => state.setPlanFilter);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleExportGyms = async () => {
    try {
      const { superadminGymsApi } = await import('@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api');
      // @ts-expect-error GET /superadmin/gyms/export to be implemented on backend
      const res = await superadminGymsApi.exportGymsCSV();
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
      }
    } catch (err) {
      // toast shown by centralized error handler
    }
  };

  return {
    search,
    handleSearchChange,
    statusFilter,
    setStatusFilter,
    planFilter,
    setPlanFilter,
    handleExportGyms,
  };
}

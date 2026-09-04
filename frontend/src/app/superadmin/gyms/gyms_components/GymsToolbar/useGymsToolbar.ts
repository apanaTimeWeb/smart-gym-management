/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: GymsToolbar -> useGymsToolbar -> useGymsStore -> API
 */

/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: GymsToolbar -> useGymsToolbar -> useGymsStore -> API
 */

// DATA FLOW: Component -> useGymsToolbar.ts -> API/Store
import { useEffect, useState, useMemo } from 'react';

import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export function useGymsToolbar() {
  const search = useGymsStore(state => state.search);
  const setSearch = useGymsStore(state => state.setSearch);

  const handleSearchChange = (value: string) => {
    setSearch(value); // useQuery in useGymsTable will handle the debouncing/refetching
  };

  return {
    search,
    handleSearchChange
  };
}

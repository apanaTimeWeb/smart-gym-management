/**
 * RESPONSIBILITY: Manages the logic for the Gyms search toolbar, including search debouncing.
 * DATA FLOW: GymsToolbar -> useGymsToolbar -> useGymsStore -> API
 */

import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export function useGymsToolbar() {
  const search = useGymsStore(state => state.search);
  const setSearch = useGymsStore(state => state.setSearch);
  const fetchGyms = useGymsStore(state => state.fetchGyms);

  // Define debounced fetch only once per component lifecycle
  const debouncedFetch = useMemo(
    () => debounce((query: string) => fetchGyms(query), 300),
    [fetchGyms]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value); // Update UI immediately
    debouncedFetch(value); // Debounce API call
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return {
    search,
    handleSearchChange
  };
}

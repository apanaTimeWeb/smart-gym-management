'use client';
﻿import { useState, useEffect } from 'react';
import { useTrainerMembersFilters } from '@/app/trainer/members/members_utils/useTrainerMembersFilters';
import { useQueryClient } from '@tanstack/react-query';

/** Owns useTrainerMembersToolbar behavior for this Trainer module. */
export function useTrainerMembersToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, progressStatusFilter, setProgressStatusFilter } = useTrainerMembersFilters();
  const queryClient = useQueryClient();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => { 
    setTimeout(() => setLocalSearch(search), 0); 
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['trainer', 'members'] });
  };

  return {
    localSearch,
    setLocalSearch,
    statusFilter,
    setStatusFilter,
    progressStatusFilter,
    setProgressStatusFilter,
    handleRefresh
  };
}

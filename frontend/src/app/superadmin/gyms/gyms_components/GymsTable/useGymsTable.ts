// RESPONSIBILITY: Provides the logic and state for the GymsTable component by interacting with useGymsStore.
// DATA FLOW: useGymsStore -> useGymsTable -> GymsTable

import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export function useGymsTable() {
  const gyms = useGymsStore(state => state.gyms);
  const search = useGymsStore(state => state.search);
  const fetchState = useGymsStore(state => state.fetchState);
  const error = useGymsStore(state => state.error);
  const actionLoadingId = useGymsStore(state => state.actionLoadingId);
  const fetchGyms = useGymsStore(state => state.fetchGyms);
  
  const handleGhostLogin = useGymsStore(state => state.handleGhostLogin);
  const handleSuspend = useGymsStore(state => state.handleSuspend);
  const handleDelete = useGymsStore(state => state.handleDelete);
  const openEditModal = useGymsStore(state => state.openEditModal);
  const openEmailModal = useGymsStore(state => state.openEmailModal);

  // Client-side filter as fallback, though fetchGyms handles server-side filtering now
  const filteredGyms = useMemo(() => {
    if (!gyms) return [];
    if (!search) return gyms;
    return gyms.filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.ownerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [gyms, search]);

  // Refetch when component mounts
  useEffect(() => {
    fetchGyms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (gymName: string) => {
    toast(`Opening details for ${gymName}`, { icon: 'ℹ️' });
  };

  const onGhostLoginClick = (e: React.MouseEvent, gymId: string, gymName: string) => {
    e.stopPropagation();
    handleGhostLogin(gymId, gymName);
  };

  const onSuspendClick = (e: React.MouseEvent, gymId: string, gymName: string, status: string) => {
    e.stopPropagation();
    handleSuspend(gymId, gymName, status);
  };

  const onDeleteClick = (e: React.MouseEvent, gymId: string, gymName: string) => {
    e.stopPropagation();
    handleDelete(gymId, gymName);
  };

  return {
    filteredGyms,
    fetchState,
    error,
    actionLoadingId,
    handleRowClick,
    onGhostLoginClick,
    onSuspendClick,
    onDeleteClick,
    openEditModal,
    openEmailModal,
  };
}

// RESPONSIBILITY: Provides the logic and state for the GymsTable component by interacting with useGymsStore.
// DATA FLOW: useGymsStore -> useGymsTable -> GymsTable

import { useEffect } from 'react';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';
import toast from 'react-hot-toast';

export function useGymsTable() {
  const loading = useGymsStore(state => state.loading);
  const error = useGymsStore(state => state.error);
  const fetchGyms = useGymsStore(state => state.fetchGyms);
  const filteredGyms = useGymsStore(state => state.getFilteredGyms());
  
  const handleGhostLogin = useGymsStore(state => state.handleGhostLogin);
  const handleSuspend = useGymsStore(state => state.handleSuspend);
  const handleDelete = useGymsStore(state => state.handleDelete);
  const openEditModal = useGymsStore(state => state.openEditModal);
  const openEmailModal = useGymsStore(state => state.openEmailModal);

  // Refetch when component mounts
  useEffect(() => {
    fetchGyms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (gymName: string) => {
    // This is where we would open a modal or redirect to details
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
    loading,
    error,
    handleRowClick,
    onGhostLoginClick,
    onSuspendClick,
    onDeleteClick,
    openEditModal,
    openEmailModal,
  };
}

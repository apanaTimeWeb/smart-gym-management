/**
 * RESPONSIBILITY: Hook to manage the state and logic of the GymDeleteModal.
 * DATA FLOW: GymDeleteModal -> useGymDeleteModal -> useGymsStore -> API
 */
// DATA FLOW: Component -> useGymDeleteModal.ts -> API/Store
import { useState, useEffect } from 'react';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export function useGymDeleteModal() {
  const isDeleteModalOpen = useGymsStore(state => state.isDeleteModalOpen);
  const closeDeleteModal = useGymsStore(state => state.closeDeleteModal);
  const gymToDelete = useGymsStore(state => state.gymToDelete);
  const handleDelete = useGymsStore(state => state.handleDelete);
  const actionLoadingId = useGymsStore(state => state.actionLoadingId);

  const [confirmText, setConfirmText] = useState('');

  // Reset confirmation text whenever the modal opens or closes
  useEffect(() => {
    if (!isDeleteModalOpen) {
      setConfirmText('');
    }
  }, [isDeleteModalOpen]);

  const handleConfirmDelete = () => {
    if (confirmText === 'DELETE' && gymToDelete) {
      handleDelete(gymToDelete.id);
    }
  };

  return {
    isDeleteModalOpen,
    closeDeleteModal,
    gymToDelete,
    confirmText,
    setConfirmText,
    handleConfirmDelete,
    actionLoadingId
  };
}

'use client';
// RESPONSIBILITY: Hook to manage the state and logic of the SuperadminGymDeleteModal.
// DATA FLOW: SuperadminGymDeleteModal -> useSuperadminGymDeleteModal -> API

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';

export function useSuperadminGymDeleteModal() {
  const isDeleteModalOpen = useSuperadminGymsStore(state => state.isDeleteModalOpen);
  const closeDeleteModal = useSuperadminGymsStore(state => state.closeDeleteModal);
  const gymToDelete = useSuperadminGymsStore(state => state.gymToDelete);

  
  const queryClient = useQueryClient();

  const [confirmText, setConfirmText] = useState('');

  // Reset confirmation text whenever the modal opens or closes
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.
  useEffect(() => {
    if (!isDeleteModalOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmText('');
    }
  }, [isDeleteModalOpen]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => gymsApi.deleteGym(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
      closeDeleteModal();
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message, { id: 'failed-to-delete-tenant' });
    }
  });

  const handleConfirmDelete = () => {
    if (confirmText === 'DELETE' && gymToDelete) {
      deleteMutation.mutate(gymToDelete.id);
    }
  };

  return {
    isDeleteModalOpen,
    closeDeleteModal,
    gymToDelete,
    confirmText,
    setConfirmText,
    handleConfirmDelete,
    actionLoadingId: deleteMutation.isPending ? gymToDelete?.id : null
  };
}


// DATA FLOW: Superadmin UI → useSuperadminGymDeleteModal → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Hook to manage the state and logic of the SuperadminGymDeleteModal.
// DATA FLOW: SuperadminGymDeleteModal -> useSuperadminGymDeleteModal -> API
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
/**
 * Purpose: Hook to manage the state and logic of the SuperadminGymDeleteModal.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGymDeleteModal() {
    const isDeleteModalOpen = useSuperadminGymsStore(state => state.isDeleteModalOpen);
    const closeDeleteModal = useSuperadminGymsStore(state => state.closeDeleteModal);
    const gymToDelete = useSuperadminGymsStore(state => state.gymToDelete);
    const queryClient = useQueryClient();
    const [confirmText, setConfirmText] = useState('');
    // Reset confirmation text whenever the modal opens or closes
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (!isDeleteModalOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setConfirmText('');
        }
    }, [isDeleteModalOpen]);
    const deleteMutation = useMutation({
        mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => gymsApi.deleteGym(id, idempotencyKey),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-f1e29ad0b1' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
            closeDeleteModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-delete-tenant' });
        }
    });
    const handleConfirmDelete = () => {
        if (confirmText === 'DELETE' && gymToDelete) {
            deleteMutation.mutate({ id: gymToDelete.id, idempotencyKey: crypto.randomUUID() });
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

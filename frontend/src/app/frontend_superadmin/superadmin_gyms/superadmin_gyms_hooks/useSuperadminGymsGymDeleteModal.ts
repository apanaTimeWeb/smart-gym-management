'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsGymDeleteModal → Superadmin module API/state → consuming component
// RESPONSIBILITY: Hook to manage the state and logic of the SuperadminGymsGymDeleteModal.
// DATA FLOW: SuperadminGymsGymDeleteModal -> useSuperadminGymsGymDeleteModal -> API
import { useEffect, useRef, useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';


/**
 * Purpose: Hook to manage the state and logic of the SuperadminGymsGymDeleteModal.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsGymDeleteModal.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsGymDeleteModal → consuming feature component.
export function useSuperadminGymsGymDeleteModal() {
    const isDeleteModalOpen = useSuperadminGymsStore(state => state.isDeleteModalOpen);
    const closeDeleteModal = useSuperadminGymsStore(state => state.closeDeleteModal);
    const gymToDelete = useSuperadminGymsStore(state => state.gymToDelete);
    const queryClient = useQueryClient();
    const [confirmText, setConfirmText] = useState('');
    const idempotencyKeyRef = useRef<string | null>(null);
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
            idempotencyKeyRef.current = null;
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
            closeDeleteModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-delete-tenant' });
        }
    });
    const handleConfirmDelete = () => {
        if (confirmText === 'DELETE' && gymToDelete) {
            idempotencyKeyRef.current ??= crypto.randomUUID();
            deleteMutation.mutate({ id: gymToDelete.id, idempotencyKey: idempotencyKeyRef.current });
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

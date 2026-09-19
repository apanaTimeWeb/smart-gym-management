// DATA FLOW: Superadmin UI → useSuperadminBroadcastsMutations → Superadmin module API/state → consuming component
// DATA FLOW: feature API/schema → hook/context → useSuperadminBroadcastsMutations consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { broadcastsApi } from '@/app/superadmin/broadcasts/broadcasts_api/SuperadminBroadcastsApi';
import type { BroadcastFormData, Broadcast, SuperadminBroadcastsTenant } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
import type { UseFormReturn } from 'react-hook-form';
import type { ApiResponse } from '@/lib/api';
/**
 * Purpose: Encapsulates functionality for useSuperadminBroadcastsMutations.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminBroadcastsMutations = ({ setIsModalOpen, setEditingId, form, gyms, setQueueRecipients, setQueueBroadcastId, setQueueTitle, setQueueModalOpen, createIdempotencyKey }: {
    setIsModalOpen: (val: boolean) => void;
    setEditingId: (val: string | null) => void;
    form: UseFormReturn<BroadcastFormData>;
    gyms: SuperadminBroadcastsTenant[];
    setQueueBroadcastId: (val: string | null) => void;
    setQueueRecipients: (val: {
        id: string;
        name: string;
        phone: string;
    }[]) => void;
    setQueueTitle: (val: string) => void;
    setQueueModalOpen: (val: boolean) => void;
    createIdempotencyKey: string;
}) => {
    const queryClient = useQueryClient();
    const invalidateBroadcasts = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'broadcasts'] });
    const createMutation = useMutation({
        mutationFn: (data: BroadcastFormData) => broadcastsApi.createBroadcast(data, createIdempotencyKey),
        onSuccess: async (res: ApiResponse<Broadcast>, variables: BroadcastFormData) => {
            if (res.success && res.data) {
                await invalidateBroadcasts();
                setIsModalOpen(false);
                form.reset();
                const isSendingNow = variables.status === 'SENT';
                if (!isSendingNow) {
                    toast.success(res.message, { id: 'superadmin-toast-31b3e26cea' });
                }
                else {
                    const targetGymIds = res.data.targetGymIds || [];
                    const selectedGyms = gyms?.filter(g => targetGymIds.includes(g.id)) || [];
                    const recipients = selectedGyms.map(g => ({ id: g.id, name: g.name, phone: g.phone || 'N/A' }));
                    setQueueRecipients(recipients);
                    setQueueBroadcastId(res.data.id);
                    setQueueTitle(res.data.title);
                    setQueueModalOpen(true);
                }
            }
            else {
                toast.error(res.message, { id: 'superadmin-toast-a262452314' });
            }
        },
        onError: (error: Error) => {
            toast.error(error.message, { id: 'superadmin-toast-703cf4178b' });
        }
    });
    const updateMutation = useMutation({
        mutationFn: ({ id, data, idempotencyKey }: {
            id: string;
            data: Partial<BroadcastFormData>;
            idempotencyKey: string;
        }) => broadcastsApi.updateBroadcast(id, data, idempotencyKey),
        onSuccess: async (res: ApiResponse<Broadcast>, variables: {
            id: string;
            data: Partial<BroadcastFormData>;
            idempotencyKey: string;
        }) => {
            if (res.success && res.data) {
                await invalidateBroadcasts();
                setIsModalOpen(false);
                setEditingId(null);
                form.reset();
                const isSendingNow = variables.data.status === 'SENT';
                if (!isSendingNow) {
                    toast.success(res.message, { id: 'superadmin-toast-f944ba3197' });
                }
                else {
                    const targetGymIds = res.data.targetGymIds || [];
                    const selectedGyms = gyms?.filter(g => targetGymIds.includes(g.id)) || [];
                    const recipients = selectedGyms.map(g => ({ id: g.id, name: g.name, phone: g.phone || 'N/A' }));
                    setQueueRecipients(recipients);
                    setQueueBroadcastId(res.data.id);
                    setQueueTitle(res.data.title);
                    setQueueModalOpen(true);
                }
            }
            else {
                toast.error(res.message, { id: 'superadmin-toast-158990c2be' });
            }
        },
        onError: (error: Error) => {
            toast.error(error.message, { id: 'superadmin-toast-46f7e97dc8' });
        }
    });
    const deleteMutation = useMutation({
        mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => broadcastsApi.deleteBroadcast(id, idempotencyKey),
        onSuccess: async (res: ApiResponse<void>) => {
            if (res.success) {
                await invalidateBroadcasts();
                toast.success(res.message, { id: 'superadmin-toast-1ab4bc4752' });
            }
            else {
                toast.error(res.message, { id: 'superadmin-toast-3edb8dabdf' });
            }
        },
        onError: (error: Error) => {
            toast.error(error.message, { id: 'superadmin-toast-809e8c4528' });
        }
    });
    const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
    return { createMutation, updateMutation, deleteMutation, isMutating };
};

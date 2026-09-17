// DATA FLOW: Superadmin UI → useSuperadminBroadcastsMutations → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminBroadcastsMutations consumers.
'use client';
// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsMutations.ts
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import type { BroadcastFormData, Broadcast, SuperadminBroadcastsTenant } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import type { UseFormReturn } from 'react-hook-form';
import type { ApiResponse } from '@/lib/api';
export const useSuperadminBroadcastsMutations = ({ updateBroadcasts, setIsModalOpen, setEditingId, form, gyms, setQueueRecipients, setQueueTitle, setQueueModalOpen, }: {
    updateBroadcasts: (updater: (prev: Broadcast[]) => Broadcast[]) => void;
    setIsModalOpen: (val: boolean) => void;
    setEditingId: (val: string | null) => void;
    form: UseFormReturn<BroadcastFormData>;
    gyms: SuperadminBroadcastsTenant[];
    setQueueRecipients: (val: {
        id: string;
        name: string;
        phone: string;
    }[]) => void;
    setQueueTitle: (val: string) => void;
    setQueueModalOpen: (val: boolean) => void;
}) => {
    const createMutation = useMutation({
        mutationFn: (data: BroadcastFormData) => broadcastsApi.createBroadcast(data),
        onSuccess: (res: ApiResponse<Broadcast>, variables: BroadcastFormData) => {
            if (res.success && res.data) {
                updateBroadcasts(prev => [res.data!, ...prev]);
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
        mutationFn: ({ id, data }: {
            id: string;
            data: Partial<BroadcastFormData>;
        }) => broadcastsApi.updateBroadcast(id, data),
        onSuccess: (res: ApiResponse<Broadcast>, variables: {
            id: string;
            data: Partial<BroadcastFormData>;
        }) => {
            if (res.success && res.data) {
                updateBroadcasts(prev => prev.map(b => b.id === variables.id ? res.data! : b));
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
        mutationFn: (id: string) => broadcastsApi.deleteBroadcast(id),
        onSuccess: (res: ApiResponse<void>, id: string) => {
            if (res.success) {
                updateBroadcasts(prev => prev.filter(b => b.id !== id));
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

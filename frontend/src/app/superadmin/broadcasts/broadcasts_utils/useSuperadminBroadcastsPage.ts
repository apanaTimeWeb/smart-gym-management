// DATA FLOW: Superadmin UI → useSuperadminBroadcastsPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: useSuperadminBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: broadcastsApi → useSuperadminBroadcastsPage → SuperadminBroadcastsClient
import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastStatus } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
import { useSuperadminBroadcastsData } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsData';
import { useSuperadminBroadcastsMutations } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsMutations';
import { useSuperadminBroadcastQueueState } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastQueueState';
/**
 * Purpose: useSuperadminBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminBroadcastsPage = () => {
    const { broadcasts, gyms, fetchState, error, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage } = useSuperadminBroadcastsData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const createIdempotencyKeyRef = useRef<string | null>(null);
    const updateIdempotencyKeysRef = useRef(new Map<string, string>());
    const deleteIdempotencyKeysRef = useRef(new Map<string, string>());
    const sendIdempotencyKeysRef = useRef(new Map<string, string>());
    const queueState = useSuperadminBroadcastQueueState();
    const form = useForm<BroadcastFormData>({
        resolver: zodResolver(BroadcastSchema),
        defaultValues: {
            title: '',
            content: '',
            targetGymIds: [],
            status: 'DRAFT',
            scheduledDate: '',
        },
    });
    const stableCreateIdempotencyKey = createIdempotencyKeyRef.current ?? (createIdempotencyKeyRef.current = crypto.randomUUID());
    const { createMutation, updateMutation, deleteMutation, isMutating } = useSuperadminBroadcastsMutations({
        setIsModalOpen,
        setEditingId,
        form,
        gyms,
        ...queueState,
        createIdempotencyKey: stableCreateIdempotencyKey,
    });
    const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
        const { scheduledDate, ...rest } = data;
        const payload = scheduledDate ? { ...rest, scheduledDate } : rest;
        if (editingId) {
            const idempotencyKey = updateIdempotencyKeysRef.current.get(editingId) ?? crypto.randomUUID();
            updateIdempotencyKeysRef.current.set(editingId, idempotencyKey);
            try {
                await updateMutation.mutateAsync({ id: editingId, data: payload, idempotencyKey });
                updateIdempotencyKeysRef.current.delete(editingId);
            } catch {
                // Keep the key stable across retries for the same failed user intent.
            }
        }
        else {
            createMutation.mutate(payload as BroadcastFormData);
        }
    }, [editingId, updateMutation, createMutation]);
    const handleDeleteBroadcast = useCallback(async (id: string) => {
        const idempotencyKey = deleteIdempotencyKeysRef.current.get(id) ?? crypto.randomUUID();
        deleteIdempotencyKeysRef.current.set(id, idempotencyKey);
        try {
            await deleteMutation.mutateAsync({ id, idempotencyKey });
            deleteIdempotencyKeysRef.current.delete(id);
        } catch {
            // Keep the key stable across retries for the same failed delete intent.
        }
    }, [deleteMutation]);
    const handleSendBroadcast = useCallback(async (id: string) => {
        const idempotencyKey = sendIdempotencyKeysRef.current.get(id) ?? crypto.randomUUID();
        sendIdempotencyKeysRef.current.set(id, idempotencyKey);
        try {
            await updateMutation.mutateAsync({ id, data: { status: 'SENT' }, idempotencyKey });
            sendIdempotencyKeysRef.current.delete(id);
            updateIdempotencyKeysRef.current.delete(id);
        } catch {
            // Keep the key stable across retries for the same failed send intent.
        }
    }, [updateMutation]);
    const onQueueComplete = useCallback((message: string) => {
        queueState.setQueueModalOpen(false);
        queueState.setQueueBroadcastId(null);
        toast.success(message, { id: 'automated-broadcast-delivery-complete' });
    }, [queueState]);
    const openEditModal = useCallback((broadcast: Broadcast) => {
        setEditingId(broadcast.id);
        if (!updateIdempotencyKeysRef.current.has(broadcast.id)) updateIdempotencyKeysRef.current.set(broadcast.id, crypto.randomUUID());
        form.reset({
            title: broadcast.title,
            content: broadcast.content,
            targetGymIds: broadcast.targetGymIds || [],
            status: broadcast.status as BroadcastStatus,
            scheduledDate: broadcast.scheduledDate
                ? new Date(broadcast.scheduledDate).toISOString().slice(0, 16)
                : '',
        });
        setIsModalOpen(true);
    }, [form]);
    const openCreateModal = useCallback(() => {
        setEditingId(null);
        createIdempotencyKeyRef.current = crypto.randomUUID();
        form.reset({
            title: '',
            content: '',
            targetGymIds: [],
            status: 'DRAFT',
            scheduledDate: '',
        });
        setIsModalOpen(true);
    }, [form]);
    return {
        fetchState,
        error,
        broadcasts,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        totalPages,
        setCurrentPage,
        isModalOpen,
        setIsModalOpen,
        form,
        handleCreateBroadcast,
        handleDeleteBroadcast,
        handleSendBroadcast,
        openEditModal,
        openCreateModal,
        editingId,
        isMutating,
        queueModalOpen: queueState.queueModalOpen,
        queueRecipients: queueState.queueRecipients,
        queueBroadcastId: queueState.queueBroadcastId,
        queueTitle: queueState.queueTitle,
        onQueueComplete,
        setQueueModalOpen: queueState.setQueueModalOpen
    };
};

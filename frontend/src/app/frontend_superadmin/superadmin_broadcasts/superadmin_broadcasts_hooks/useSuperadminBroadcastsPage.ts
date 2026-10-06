'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminBroadcastsPage → consuming feature component.
import { useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';
import { useSuperadminBroadcastsBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastQueueState';
import { useSuperadminBroadcastsData } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsData';
import { useSuperadminBroadcastsIdempotencyKeys } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsIdempotencyKeys';
import { useSuperadminBroadcastsMutations } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsMutations';
import { BroadcastSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsContractSchemas';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';
import type { BroadcastFormData, Broadcast, BroadcastStatus } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';

/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminBroadcastsPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBroadcastsPage → consuming feature component.
export const useSuperadminBroadcastsPage = () => {
    const t = useTranslations('superadmin_broadcasts');
    const { broadcasts, gyms, status, error, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage } = useSuperadminBroadcastsData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const idempotencyKeys = useSuperadminBroadcastsIdempotencyKeys();
    const queueState = useSuperadminBroadcastsBroadcastQueueState();
    const form = useForm<BroadcastFormData>({
        resolver: zodResolver(BroadcastSchema),
        defaultValues: {
            title: '',
            content: '',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        },
    });
    const { createMutation, updateMutation, deleteMutation, isMutating } = useSuperadminBroadcastsMutations({
        setIsModalOpen,
        setEditingId,
        form,
        gyms,
        ...queueState,
    });
    useSuperadminLayoutUnsavedChangesGuard(form.formState.isDirty && isModalOpen && !isMutating, t('ui.unsaved_broadcast_discard_repair'));
    const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
        const { scheduledDate, ...rest } = data;
        const payload = scheduledDate ? { ...rest, scheduledDate } : rest;
        if (editingId) {
            const idempotencyKey = idempotencyKeys.getUpdateKey(editingId);
            try {
                await updateMutation.mutateAsync({ id: editingId, data: payload, idempotencyKey });
                idempotencyKeys.clearUpdateKey(editingId);
            } catch {
                // Keep the key stable across retries for the same failed user intent.
            }
        }
        else {
            try {
                await createMutation.mutateAsync({
                    data: payload as BroadcastFormData,
                    idempotencyKey: idempotencyKeys.getCreateKey(),
                });
                idempotencyKeys.clearCreateKey();
            } catch {
                // Keep the key stable across retries for the same failed create intent.
            }
        }
    }, [editingId, updateMutation, createMutation, idempotencyKeys]);
    const handleDeleteBroadcast = useCallback(async (id: string) => {
        const idempotencyKey = idempotencyKeys.getDeleteKey(id);
        try {
            await deleteMutation.mutateAsync({ id, idempotencyKey });
            idempotencyKeys.clearDeleteKey(id);
        } catch {
            // Keep the key stable across retries for the same failed delete intent.
        }
    }, [deleteMutation, idempotencyKeys]);
    const handleSendBroadcast = useCallback(async (id: string) => {
        const idempotencyKey = idempotencyKeys.getSendKey(id);
        try {
            await updateMutation.mutateAsync({ id, data: { status: SUPERADMIN_BROADCAST_STATUS_CODES.SENT }, idempotencyKey });
            idempotencyKeys.clearSendKey(id);
            idempotencyKeys.clearUpdateKey(id);
        } catch {
            // Keep the key stable across retries for the same failed send intent.
        }
    }, [updateMutation, idempotencyKeys]);
    const onQueueComplete = useCallback((message: string) => {
        queueState.setQueueModalOpen(false);
        queueState.setQueueBroadcastId(null);
        toast.success(message, { id: 'automated-broadcast-delivery-complete' });
    }, [queueState]);
    const openEditModal = useCallback((broadcast: Broadcast) => {
        setEditingId(broadcast.id);
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
        idempotencyKeys.clearCreateKey();
        form.reset({
            title: '',
            content: '',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        });
        setIsModalOpen(true);
    }, [form]);
    return {
        status,
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
        queueTitle: queueState.queueTitle, onQueueComplete, setQueueModalOpen: queueState.setQueueModalOpen
    };
};
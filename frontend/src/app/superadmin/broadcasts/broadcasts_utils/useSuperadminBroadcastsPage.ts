// RESPONSIBILITY: useSuperadminBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: broadcastsApi → useSuperadminBroadcastsPage → SuperadminBroadcastsClient
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastStatus } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import { useSuperadminBroadcastsData } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsData';
import { useSuperadminBroadcastsMutations } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastsMutations';

export const useSuperadminBroadcastsPage = () => {
  const {
    broadcasts,
    gyms,
    fetchState,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    updateBroadcasts
  } = useSuperadminBroadcastsData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueRecipients, setQueueRecipients] = useState<{id: string; name: string; phone: string}[]>([]);
  const [queueTitle, setQueueTitle] = useState('');

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

  const { createMutation, updateMutation, deleteMutation, isMutating } = useSuperadminBroadcastsMutations({
    updateBroadcasts,
    setIsModalOpen,
    setEditingId,
    form,
    gyms,
    setQueueRecipients,
    setQueueTitle,
    setQueueModalOpen,
  });

  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    const { scheduledDate, ...rest } = data;
    const payload = scheduledDate ? { ...rest, scheduledDate } : rest;

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload as BroadcastFormData);
    }
  }, [editingId, updateMutation, createMutation]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  const handleSendBroadcast = useCallback(async (id: string) => {
    updateMutation.mutate({ id, data: { status: 'SENT' } });
  }, [updateMutation]);

  const onQueueComplete = useCallback(() => {
    setQueueModalOpen(false);
    toast.success('Automated broadcast finished successfully!', { id: 'automated-broadcast-finished-successfully' });
  }, []);

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
    queueModalOpen,
    queueRecipients,
    queueTitle,
    onQueueComplete
  };
};

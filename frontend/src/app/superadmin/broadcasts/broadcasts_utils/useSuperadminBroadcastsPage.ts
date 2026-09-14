// RESPONSIBILITY: useSuperadminBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: broadcastsApi → useSuperadminBroadcastsPage → SuperadminBroadcastsClient
import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastStatus, type BroadcastStatusFilter } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types';

export const useSuperadminBroadcastsPage = () => {
  const queryClient = useQueryClient();

  const { data: broadcastsRes, status: fetchState, error } = useQuery({
    queryKey: ['superadmin', 'broadcasts'],
    queryFn: () => broadcastsApi.fetchBroadcasts(),
  });

  const { data: gymsRes } = useQuery({
    queryKey: ['superadmin', 'gyms'],
    queryFn: () => gymsApi.fetchGyms(),
  });

  const updateBroadcasts = useCallback((updater: (prev: Broadcast[]) => Broadcast[]) => {
    queryClient.setQueryData(['superadmin', 'broadcasts'], (oldData: { data: Broadcast[] } | undefined) => {
      if (!oldData?.data) return oldData;
      return { ...oldData, data: updater(oldData.data) };
    });
  }, [queryClient]);

  const broadcasts = useMemo(() => (broadcastsRes?.data as Broadcast[]) ?? [], [broadcastsRes]);
  const gyms = useMemo(() => (gymsRes?.data as Tenant[]) ?? [], [gymsRes]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BroadcastStatusFilter>('ALL');

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

  const isMutating = false;

  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    const { scheduledDate, ...rest } = data;
    const payload = scheduledDate ? { ...rest, scheduledDate } : rest;
    const isSendingNow = payload.status === 'SENT';

    let newB: Broadcast | null = null;

    if (editingId) {
      updateBroadcasts(prev => prev.map(b => b.id === editingId ? { ...b, ...payload } as Broadcast : b));
      setIsModalOpen(false);
      setEditingId(null);
      form.reset();
      if (!isSendingNow) toast.success('Broadcast updated successfully', { id: 'broadcast-updated-successfully' });
    } else {
      newB = { ...payload, id: `b-${Date.now()}`, sentDate: isSendingNow ? new Date().toISOString() : undefined } as Broadcast;
      updateBroadcasts(prev => [newB!, ...prev]);
      setIsModalOpen(false);
      form.reset();
      if (!isSendingNow) toast.success('Broadcast created successfully', { id: 'broadcast-created-successfully' });
    }

    if (isSendingNow) {
      const selectedGyms = gyms?.filter(g => payload.targetGymIds?.includes(g.id)) || [];
      const recipients = selectedGyms.map(g => ({ id: g.id, name: ('gymName' in g ? (g as {gymName?: string}).gymName : '') || g.name, phone: g.phone || 'N/A' }));
      setQueueRecipients(recipients);
      setQueueTitle(payload.title);
      setQueueModalOpen(true);
    }
  }, [form, editingId, updateBroadcasts, gyms]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    updateBroadcasts(prev => prev.filter(b => b.id !== id));
    toast.success('Broadcast deleted successfully', { id: 'broadcast-deleted-successfully' });
  }, [updateBroadcasts]);

  const handleSendBroadcast = useCallback(async (id: string) => {
    const b = broadcasts.find(b => b.id === id);
    if (!b) return;

    updateBroadcasts(prev => prev.map(item => item.id === id ? { ...item, status: 'SENT', sentDate: new Date().toISOString() } : item));

    const selectedGyms = gyms?.filter(g => b.targetGymIds?.includes(g.id)) || [];
    const recipients = selectedGyms.map(g => ({ id: g.id, name: ('gymName' in g ? (g as {gymName?: string}).gymName : '') || g.name, phone: g.phone || 'N/A' }));
    setQueueRecipients(recipients);
    setQueueTitle(b.title);
    setQueueModalOpen(true);
  }, [updateBroadcasts, broadcasts, gyms]);

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

  const filteredBroadcasts = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return broadcasts.filter(b => {
      const matchesSearch = (b.title || '').toLowerCase().includes(lowerQuery) ||
                            (b.content || '').toLowerCase().includes(lowerQuery);
      const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [broadcasts, searchQuery, statusFilter]);

  return {
    fetchState,
    error,
    broadcasts: filteredBroadcasts,
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

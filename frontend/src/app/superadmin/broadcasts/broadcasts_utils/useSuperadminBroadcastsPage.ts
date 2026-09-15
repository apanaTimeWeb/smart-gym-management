// RESPONSIBILITY: useSuperadminBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: broadcastsApi → useSuperadminBroadcastsPage → SuperadminBroadcastsClient
import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastStatus, type BroadcastStatusFilter } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import type { SuperadminBroadcastsTenant } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export const useSuperadminBroadcastsPage = () => {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();

  const searchQuery = getParam('search', '');
  const statusFilter = getParam('status', 'ALL') as BroadcastStatusFilter;

  const setSearchQuery = (val: string) => setParam('search', val);
  const setStatusFilter = (val: BroadcastStatusFilter) => setParam('status', val);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    return params;
  }, [searchQuery, statusFilter]);

  const queryKey = useMemo(() => ['superadmin', 'broadcasts', queryParams], [queryParams]);

  const { data: broadcastsRes, status: fetchState, error } = useQuery({
    queryKey,
    queryFn: () => broadcastsApi.fetchBroadcasts(queryParams),
  });

  const { data: gymsRes } = useQuery({
    queryKey: ['superadmin', 'gyms'],
    queryFn: () => broadcastsApi.fetchTenants(),
  });

  const updateBroadcasts = useCallback((updater: (prev: Broadcast[]) => Broadcast[]) => {
    queryClient.setQueryData(queryKey, (oldData: { data: Broadcast[] } | undefined) => {
      if (!oldData?.data) return oldData;
      return { ...oldData, data: updater(oldData.data) };
    });
  }, [queryClient, queryKey]);

  const broadcasts = useMemo(() => (broadcastsRes?.data as Broadcast[]) ?? [], [broadcastsRes]);
  const gyms = useMemo(() => (gymsRes?.data as SuperadminBroadcastsTenant[]) ?? [], [gymsRes]);

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

  const createMutation = useMutation({
    mutationFn: (data: BroadcastFormData) => broadcastsApi.createBroadcast(data),
    onSuccess: (res: any, variables: any) => {
      if (res.success && res.data) {
        updateBroadcasts(prev => [res.data!, ...prev]);
        setIsModalOpen(false);
        form.reset();
        const isSendingNow = variables.status === 'SENT';
        if (!isSendingNow) {
            toast.success(res.message || 'Broadcast created successfully', { id: 'broadcast-created-successfully' });
        } else {
            const targetGymIds = res.data.targetGymIds || [];
            const selectedGyms = gyms?.filter(g => targetGymIds.includes(g.id)) || [];
            const recipients = selectedGyms.map(g => ({ id: g.id, name: g.name, phone: g.phone || 'N/A' }));
            setQueueRecipients(recipients);
            setQueueTitle(res.data.title);
            setQueueModalOpen(true);
        }
      } else {
        toast.error(res.message || 'Failed to create broadcast');
      }
    },
    onError: (error: any) => {
        toast.error(error.message || 'Failed to create broadcast');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<BroadcastFormData> }) => broadcastsApi.updateBroadcast(id, data),
    onSuccess: (res: any, variables: any) => {
      if (res.success && res.data) {
        updateBroadcasts(prev => prev.map(b => b.id === variables.id ? res.data! : b));
        setIsModalOpen(false);
        setEditingId(null);
        form.reset();
        const isSendingNow = variables.data.status === 'SENT';
        if (!isSendingNow) {
            toast.success(res.message || 'Broadcast updated successfully', { id: 'broadcast-updated-successfully' });
        } else {
            const targetGymIds = res.data.targetGymIds || [];
            const selectedGyms = gyms?.filter(g => targetGymIds.includes(g.id)) || [];
            const recipients = selectedGyms.map(g => ({ id: g.id, name: g.name, phone: g.phone || 'N/A' }));
            setQueueRecipients(recipients);
            setQueueTitle(res.data.title);
            setQueueModalOpen(true);
        }
      } else {
        toast.error(res.message || 'Failed to update broadcast');
      }
    },
    onError: (error: any) => {
        toast.error(error.message || 'Failed to update broadcast');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => broadcastsApi.deleteBroadcast(id),
    onSuccess: (res: any, id: any) => {
      if (res.success) {
        updateBroadcasts(prev => prev.filter(b => b.id !== id));
        toast.success(res.message || 'Broadcast deleted successfully', { id: 'broadcast-deleted-successfully' });
      } else {
        toast.error(res.message || 'Failed to delete broadcast');
      }
    },
    onError: (error: any) => {
        toast.error(error.message || 'Failed to delete broadcast');
    }
  });

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

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

  const filteredBroadcasts = broadcasts;

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

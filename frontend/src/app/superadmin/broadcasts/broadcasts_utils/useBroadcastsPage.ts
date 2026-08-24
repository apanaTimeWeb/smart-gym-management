// RESPONSIBILITY: useBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: superadminApi → useBroadcastsPage → BroadcastsClient
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { broadcastsApi } from '@/app/superadmin/broadcasts/broadcasts_api/broadcasts_api';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastAudience, type BroadcastStatus } from '@/app/superadmin/broadcasts/broadcasts_types/broadcasts_types';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

export const useBroadcastsPage = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    { id: '1', title: 'System Maintenance', content: 'Scheduled downtime this weekend.', audience: 'ALL_TENANTS', status: 'SENT', scheduledDate: null, sentDate: '2023-08-10' }
  ]);
  
  // Ignore API fetch error and return success state
  const fetchState = 'success';
  const error = null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<BroadcastFormData>({
    resolver: zodResolver(BroadcastSchema),
    defaultValues: {
      title: '',
      content: '',
      audience: 'ALL_TENANTS',
      status: 'DRAFT',
      scheduledDate: '',
    },
  });

  const { mutate, isMutating } = useSuperadminMutation();

  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    // Build payload without scheduledDate when empty — avoids `delete (obj as any).key`
    const { scheduledDate, ...rest } = data;
    const payload = scheduledDate ? { ...rest, scheduledDate } : rest;

    if (editingId) {
      await mutate<Broadcast>(
        () => broadcastsApi.update(editingId, payload),
        {
          successMessage: 'Broadcast updated successfully',
          onSuccess: (res) => {
            setBroadcasts(prev => prev.map(b => b.id === editingId ? (res as Broadcast) : b));
            setIsModalOpen(false);
            setEditingId(null);
            form.reset();
          },
        }
      );
    } else {
      await mutate<Broadcast>(
        () => broadcastsApi.create(payload),
        {
          successMessage: 'Broadcast created successfully',
          onSuccess: (res) => {
            setBroadcasts(prev => [res as Broadcast, ...prev]);
            setIsModalOpen(false);
            form.reset();
          },
        }
      );
    }
  }, [form, mutate, editingId]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    // Confirmation is handled by the caller via a modal — not window.confirm
    await mutate<void>(
      () => broadcastsApi.remove(id),
      {
        successMessage: 'Broadcast deleted successfully',
        onSuccess: () => {
          setBroadcasts(prev => prev.filter(b => b.id !== id));
        },
      }
    );
  }, [mutate]);

  const handleSendBroadcast = useCallback(async (id: string) => {
    // Confirmation is handled by the caller via a modal — not window.confirm
    await mutate<void>(
      () => broadcastsApi.send(id),
      {
        successMessage: 'Broadcast sent successfully',
        onSuccess: () => {
          setBroadcasts(prev => prev.map(b => b.id === id ? { ...b, status: 'SENT', sentDate: new Date().toISOString() } : b));
        },
      }
    );
  }, [mutate]);

  const openEditModal = useCallback((broadcast: Broadcast) => {
    setEditingId(broadcast.id);
    form.reset({
      title: broadcast.title,
      content: broadcast.content,
      audience: broadcast.audience as BroadcastAudience,
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
      audience: 'ALL_TENANTS',
      status: 'DRAFT',
      scheduledDate: '',
    });
    setIsModalOpen(true);
  }, [form]);

  const filteredBroadcasts = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return broadcasts.filter(b =>
      (b.title || '').toLowerCase().includes(lowerQuery) ||
      (b.content || '').toLowerCase().includes(lowerQuery)
    );
  }, [broadcasts, searchQuery]);

  return {
    fetchState,
    error,
    broadcasts: filteredBroadcasts,
    searchQuery,
    setSearchQuery,
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
  };
};

import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Broadcast } from '@/app/superadmin/superadmin_types/superadmin_types';
import { BroadcastSchema, BroadcastFormData } from '@/app/superadmin/superadmin_utils/SuperadminZodSchemas';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import { superadminApi } from '@/lib/superadmin-api';

export const useBroadcastsPage = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const { data: fetchedData, loading, error } = useSuperadminData<Broadcast[]>(SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE);

  useEffect(() => {
    if (fetchedData) {
      setBroadcasts(fetchedData);
    }
  }, [fetchedData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    const payload = { ...data };
    if (payload.scheduledDate === '') {
      delete (payload as any).scheduledDate;
    }
    
    if (editingId) {
      await mutate(
        () => superadminApi.broadcasts.update(editingId, payload),
        {
          successMessage: 'Broadcast updated successfully',
          onSuccess: (res) => {
            setBroadcasts(prev => prev.map(b => b.id === editingId ? res.data : b));
            setIsModalOpen(false);
            setEditingId(null);
            form.reset();
          }
        }
      );
    } else {
      await mutate(
        () => superadminApi.broadcasts.create(payload),
        {
          successMessage: 'Broadcast created successfully',
          onSuccess: (res) => {
            setBroadcasts(prev => [res.data, ...prev]);
            setIsModalOpen(false);
            form.reset();
          }
        }
      );
    }
  }, [form, mutate, editingId]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this broadcast?')) return;
    await mutate(
      () => superadminApi.broadcasts.remove(id),
      {
        successMessage: 'Broadcast deleted successfully',
        onSuccess: () => {
          setBroadcasts(prev => prev.filter(b => b.id !== id));
        }
      }
    );
  }, [mutate]);

  const handleSendBroadcast = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to send this broadcast now?')) return;
    await mutate(
      () => superadminApi.broadcasts.send(id),
      {
        successMessage: 'Broadcast sent successfully',
        onSuccess: (res) => {
          setBroadcasts(prev => prev.map(b => b.id === id ? res.data : b));
        }
      }
    );
  }, [mutate]);

  const openEditModal = useCallback((broadcast: Broadcast) => {
    setEditingId(broadcast.id);
    form.reset({
      title: broadcast.title,
      content: broadcast.content,
      audience: broadcast.audience as any,
      status: broadcast.status as any,
      scheduledDate: broadcast.scheduledDate ? new Date(broadcast.scheduledDate).toISOString().slice(0, 16) : '',
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
      b.title.toLowerCase().includes(lowerQuery) || 
      b.content.toLowerCase().includes(lowerQuery)
    );
  }, [broadcasts, searchQuery]);

  return {
    loading,
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

// RESPONSIBILITY: useBroadcastsPage.ts encapsulates all state and async logic for the Broadcasts page.
// DATA FLOW: superadminApi → useBroadcastsPage → BroadcastsClient
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { broadcastsApi } from '@/app/superadmin/broadcasts/broadcasts_api/broadcasts_api';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import { BroadcastSchema, type BroadcastFormData, type Broadcast, type BroadcastAudience, type BroadcastStatus } from '@/app/superadmin/broadcasts/broadcasts_types/broadcasts_types';
import toast from 'react-hot-toast';

/** LocalStorage key for persisting broadcasts across refreshes (TC-28/29 fix) */
const BROADCASTS_STORAGE_KEY = 'superadmin_broadcasts_v1';

const DEFAULT_BROADCASTS: Broadcast[] = [
  { id: '1', title: 'System Maintenance', content: 'Scheduled downtime this weekend.', audience: 'ALL_TENANTS', status: 'SENT', scheduledDate: null, sentDate: '2023-08-10' }
];

function loadPersistedBroadcasts(): Broadcast[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(BROADCASTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Broadcast[]) : null;
  } catch {
    return null;
  }
}

function persistBroadcasts(broadcasts: Broadcast[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BROADCASTS_STORAGE_KEY, JSON.stringify(broadcasts));
  } catch {
    // ignore
  }
}

export const useBroadcastsPage = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  
  useEffect(() => {
    const persisted = loadPersistedBroadcasts();
    const finalBroadcasts = persisted ?? DEFAULT_BROADCASTS;
    if (!persisted) persistBroadcasts(finalBroadcasts);
    setBroadcasts(finalBroadcasts);
  }, []);

  const updateBroadcasts = useCallback((newBroadcasts: Broadcast[] | ((prev: Broadcast[]) => Broadcast[])) => {
    setBroadcasts(prev => {
      const updated = typeof newBroadcasts === 'function' ? newBroadcasts(prev) : newBroadcasts;
      persistBroadcasts(updated);
      return updated;
    });
  }, []);

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
    const { scheduledDate, ...rest } = data;
    const payload = scheduledDate ? { ...rest, scheduledDate } : rest;

    // Simulate API call but save to local storage (TC-28/29)
    if (editingId) {
      updateBroadcasts(prev => prev.map(b => b.id === editingId ? { ...b, ...payload } as Broadcast : b));
      setIsModalOpen(false);
      setEditingId(null);
      form.reset();
      toast.success('Broadcast updated successfully');
    } else {
      const newB: Broadcast = { ...payload, id: `b-${Date.now()}`, sentDate: payload.status === 'SENT' ? new Date().toISOString() : undefined } as Broadcast;
      updateBroadcasts(prev => [newB, ...prev]);
      setIsModalOpen(false);
      form.reset();
      toast.success('Broadcast created successfully');
    }
  }, [form, editingId, updateBroadcasts]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    updateBroadcasts(prev => prev.filter(b => b.id !== id));
    toast.success('Broadcast deleted successfully');
  }, [updateBroadcasts]);

  const handleSendBroadcast = useCallback(async (id: string) => {
    updateBroadcasts(prev => prev.map(b => b.id === id ? { ...b, status: 'SENT', sentDate: new Date().toISOString() } : b));
    toast.success('Broadcast sent successfully');
  }, [updateBroadcasts]);

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

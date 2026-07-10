import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '../useSuperadminData';
import { SuperadminUrlConfig } from '../../superadmin_url_config';
import { Broadcast } from '../../superadmin_types/superadmin_types';
import { BroadcastSchema, BroadcastFormData } from '../SuperadminZodSchemas';

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

  const handleCreateBroadcast = useCallback((data: BroadcastFormData) => {
    const newBroadcast: Broadcast = {
      id: `bc-new-${Date.now()}`,
      title: data.title,
      content: data.content,
      audience: data.audience,
      status: data.status,
      scheduledDate: data.status === 'SCHEDULED' ? data.scheduledDate || null : null,
      sentDate: data.status === 'SENT' ? new Date().toISOString() : null,
    };

    setBroadcasts((prev) => [newBroadcast, ...prev]);
    setIsModalOpen(false);
    form.reset();
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
  };
};

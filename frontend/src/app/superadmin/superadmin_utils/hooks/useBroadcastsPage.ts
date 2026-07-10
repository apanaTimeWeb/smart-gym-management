import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '../useSuperadminData';
import { SuperadminUrlConfig } from '../../superadmin_url_config';
import { Broadcast } from '../../superadmin_types/superadmin_types';
import { BroadcastSchema, BroadcastFormData } from '../SuperadminZodSchemas';
import { useSuperadminMutation } from './useSuperadminMutation';
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

  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    await mutate(
      () => superadminApi.broadcasts.create(data),
      {
        successMessage: 'Broadcast created successfully',
        onSuccess: (res) => {
          setBroadcasts(prev => [res.data, ...prev]);
          setIsModalOpen(false);
          form.reset();
        }
      }
    );
  }, [form, mutate]);

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
    isMutating,
  };
};

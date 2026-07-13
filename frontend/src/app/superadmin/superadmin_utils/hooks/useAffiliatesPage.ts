// RESPONSIBILITY: useAffiliatesPage.ts handles the logic and UI for its corresponding feature.
import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Affiliate, AffiliateStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { AffiliateSchema, AffiliateFormData } from '@/app/superadmin/superadmin_utils/SuperadminZodSchemas';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import { superadminApi } from '@/lib/superadmin-api';

export const useAffiliatesPage = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const { data: fetchedData, loading, error } = useSuperadminData<Affiliate[]>(SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE);

  useEffect(() => {
    if (fetchedData) {
      setAffiliates(fetchedData);
    }
  }, [fetchedData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(AffiliateSchema),
    defaultValues: {
      name: '',
      email: '',
      referralCode: '',
    },
  });

  const { mutate, isMutating } = useSuperadminMutation();

  const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
    await mutate(
      (() => superadminApi.affiliates.create(data)) as any,
      {
        successMessage: 'Affiliate added successfully',
        onSuccess: (res) => {
          setAffiliates(prev => [res, ...prev]);
          setIsModalOpen(false);
          form.reset();
        }
      }
    );
  }, [form, mutate]);

  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);

  const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
    if (!editingAffiliate) return;
    await mutate(
      (() => superadminApi.affiliates.update(editingAffiliate.id, data)) as any,
      {
        successMessage: 'Affiliate updated successfully',
        onSuccess: (res) => {
          setAffiliates(prev => prev.map(a => a.id === editingAffiliate.id ? res : a));
          setIsModalOpen(false);
          setEditingAffiliate(null);
          form.reset();
        }
      }
    );
  }, [editingAffiliate, form, mutate]);

  const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
    const newStatus: AffiliateStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate(
      (() => superadminApi.affiliates.updateStatus(id, newStatus)) as any,
      {
        successMessage: `Affiliate status updated successfully`,
        onSuccess: () => {
          setAffiliates(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        }
      }
    );
  }, [mutate]);

  const handleDeleteAffiliate = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this affiliate?')) return;
    await mutate(
      (() => superadminApi.affiliates.remove(id)) as any,
      {
        successMessage: 'Affiliate deleted successfully',
        onSuccess: () => {
          setAffiliates(prev => prev.filter(a => a.id !== id));
        }
      }
    );
  }, [mutate]);

  const openEditModal = useCallback((affiliate: Affiliate) => {
    setEditingAffiliate(affiliate);
    form.reset({
      name: affiliate.name,
      email: affiliate.email,
      referralCode: affiliate.referralCode,
    });
    setIsModalOpen(true);
  }, [form]);


  const totalAffiliates = affiliates.length;
  const totalCommission = useMemo(() => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0), [affiliates]);

  const filteredAffiliates = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return affiliates.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.referralCode.toLowerCase().includes(lowerQuery) ||
      a.email.toLowerCase().includes(lowerQuery)
    );
  }, [affiliates, searchQuery]);

  return {
    loading,
    error,
    affiliates: filteredAffiliates,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    openEditModal,
    editingAffiliate,
    setEditingAffiliate,
    isMutating,
    totalAffiliates,
    totalCommission,
  };
};

// RESPONSIBILITY: useAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
// DATA FLOW: superadminApi → useAffiliatesPage → AffiliatesClient
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAffiliatesData } from '@/app/superadmin/affiliates/affiliates_utils/useAffiliatesData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { affiliatesApi } from '@/app/superadmin/affiliates/affiliates_api/affiliates_api';
import { useAffiliatesMutation } from '@/app/superadmin/affiliates/affiliates_utils/useAffiliatesMutation';
import { AffiliateSchema, AffiliateFormData } from '@/app/superadmin/affiliates/affiliates_types/affiliates_types';
import type { Affiliate, AffiliateStatus } from '@/app/superadmin/affiliates/affiliates_types/affiliates_types';

export const useAffiliatesPage = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const { data: fetchedData, fetchState, error } = useAffiliatesData<Affiliate[]>(
    SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE
  );

  // Sync fetched data into local state for pessimistic mutations
  useEffect(() => {
    if (fetchedData) setAffiliates(fetchedData);
  }, [fetchedData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(AffiliateSchema),
    defaultValues: { name: '', email: '', referralCode: '' },
  });

  const { mutate, isMutating } = useAffiliatesMutation();

  const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
    await mutate<Affiliate>(
      () => affiliatesApi.create(data),
      {
        successMessage: 'Affiliate added successfully',
        onSuccess: (res) => {
          setAffiliates(prev => [res as Affiliate, ...prev]);
          setIsModalOpen(false);
          form.reset();
        },
      }
    );
  }, [form, mutate]);

  const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
    if (!editingAffiliate) return;
    await mutate<Affiliate>(
      () => affiliatesApi.update(editingAffiliate.id, data),
      {
        successMessage: 'Affiliate updated successfully',
        onSuccess: (res) => {
          setAffiliates(prev => prev.map(a => a.id === editingAffiliate.id ? (res as Affiliate) : a));
          setIsModalOpen(false);
          setEditingAffiliate(null);
          form.reset();
        },
      }
    );
  }, [editingAffiliate, form, mutate]);

  const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
    const newStatus: AffiliateStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate<Affiliate>(
      () => affiliatesApi.updateStatus(id, newStatus),
      {
        successMessage: 'Affiliate status updated successfully',
        onSuccess: () => {
          setAffiliates(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        },
      }
    );
  }, [mutate]);

  const handleDeleteAffiliate = useCallback(async (id: string) => {
    // Confirmation is handled by the caller via a modal — not window.confirm
    await mutate<void>(
      () => affiliatesApi.remove(id),
      {
        successMessage: 'Affiliate deleted successfully',
        onSuccess: () => {
          setAffiliates(prev => prev.filter(a => a.id !== id));
        },
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
  const totalCommission = useMemo(
    () => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0),
    [affiliates]
  );

  const filteredAffiliates = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return affiliates.filter(a =>
      a.name.toLowerCase().includes(lowerQuery) ||
      a.referralCode.toLowerCase().includes(lowerQuery) ||
      a.email.toLowerCase().includes(lowerQuery)
    );
  }, [affiliates, searchQuery]);

  return {
    fetchState,
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

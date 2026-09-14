// RESPONSIBILITY: useSuperadminAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
// DATA FLOW: superadminApi → useSuperadminAffiliatesPage → SuperadminAffiliatesClient
import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { affiliatesApi } from '@/app/superadmin/affiliates/superadmin_affiliates_api/superadmin_affiliates_api';
import { useSuperadminAffiliatesMutation } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutation';
import { AffiliateSchema } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import type { Affiliate, AffiliateStatus, AffiliateStatusFilter, AffiliateFormData } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';

export const useSuperadminAffiliatesPage = () => {
  const queryClient = useQueryClient();
  const { data: affiliatesResponse, status: fetchState, error: queryError } = useQuery({
    queryKey: ['superadmin', 'affiliates'],
    queryFn: () => affiliatesApi.fetchAffiliates(),
  });
  const affiliates = affiliatesResponse?.data ?? [];
  const error = queryError instanceof Error ? queryError.message : null;

  const updateCachedAffiliates = useCallback((updater: (previous: Affiliate[]) => Affiliate[]) => {
    queryClient.setQueryData(['superadmin', 'affiliates'], (previous: typeof affiliatesResponse | undefined) => {
      if (!previous?.data) return previous;
      return { ...previous, data: updater(previous.data) };
    });
  }, [queryClient]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AffiliateStatusFilter>('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(AffiliateSchema),
    defaultValues: { name: '', email: '', referralCode: '' },
  });

  const { mutate, isMutating } = useSuperadminAffiliatesMutation();

  const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
    await mutate<Affiliate>(
      () => affiliatesApi.createAffiliate(data),
      {
        onSuccess: (res) => {
          updateCachedAffiliates(previous => [res as Affiliate, ...previous]);
          setIsModalOpen(false);
          form.reset();
        },
      }
    );
  }, [form, mutate, updateCachedAffiliates]);

  const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
    if (!editingAffiliate) return;
    await mutate<Affiliate>(
      () => affiliatesApi.updateAffiliate(editingAffiliate.id, data),
      {
        onSuccess: (res) => {
          updateCachedAffiliates(previous => previous.map(a => a.id === editingAffiliate.id ? (res as Affiliate) : a));
          setIsModalOpen(false);
          setEditingAffiliate(null);
          form.reset();
        },
      }
    );
  }, [editingAffiliate, form, mutate, updateCachedAffiliates]);

  const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
    const newStatus: AffiliateStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate<Affiliate>(
      () => affiliatesApi.updateStatus(id, newStatus),
      {
        onSuccess: (updatedAffiliate) => {
          updateCachedAffiliates(previous => previous.map(a => a.id === id ? updatedAffiliate as Affiliate : a));
        },
      }
    );
  }, [mutate, updateCachedAffiliates]);

  const handleDeleteAffiliate = useCallback(async (id: string) => {
    // Confirmation is handled by the caller via a modal — not window.confirm
    await mutate<void>(
      () => affiliatesApi.deleteAffiliate(id),
      {
        onSuccess: () => {
          updateCachedAffiliates(previous => previous.filter(a => a.id !== id));
        },
      }
    );
  }, [mutate, updateCachedAffiliates]);

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
    return affiliates.filter(a => {
      const matchesSearch = (a?.name || '').toLowerCase().includes(lowerQuery) ||
                            (a?.referralCode || '').toLowerCase().includes(lowerQuery) ||
                            (a?.email || '').toLowerCase().includes(lowerQuery);
      const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
      let matchesDate = true;
      if (startDate && endDate && a.joinedAt) {
        const joined = new Date(a.joinedAt);
        matchesDate = joined >= new Date(startDate) && joined <= new Date(endDate);
      }
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [affiliates, searchQuery, statusFilter, startDate, endDate]);

  const handlePayCommission = async (affiliate: Affiliate) => {
    try {
      await affiliatesApi.payCommission(affiliate.id);
    } catch {
      // handled by error boundary
    }
  };

  return {
    fetchState,
    error,
    affiliates: filteredAffiliates,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    handlePayCommission,
    openEditModal,
    editingAffiliate,
    setEditingAffiliate,
    isMutating,
    totalAffiliates,
    totalCommission,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};

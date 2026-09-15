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
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export const useSuperadminAffiliatesPage = () => {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();

  const searchQuery = getParam('search', '');
  const statusFilter = getParam('status', 'ALL') as AffiliateStatusFilter;
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');

  const setSearchQuery = (val: string) => setParam('search', val);
  const setStatusFilter = (val: AffiliateStatusFilter) => setParam('status', val);
  const setStartDate = (val: string) => setParam('startDate', val);
  const setEndDate = (val: string) => setParam('endDate', val);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return params;
  }, [searchQuery, statusFilter, startDate, endDate]);

  const queryKey = useMemo(() => ['superadmin', 'affiliates', queryParams], [queryParams]);
  const { data: affiliatesResponse, status: fetchState, error: queryError } = useQuery({
    queryKey,
    queryFn: () => affiliatesApi.fetchAffiliates(queryParams),
  });
  const affiliates = affiliatesResponse?.data ?? [];
  const error = queryError instanceof Error ? queryError.message : null;

  const updateCachedAffiliates = useCallback((updater: (previous: Affiliate[]) => Affiliate[]) => {
    queryClient.setQueryData(queryKey, (previous: typeof affiliatesResponse | undefined) => {
      if (!previous?.data) return previous;
      return { ...previous, data: updater(previous.data) };
    });
  }, [queryClient, queryKey]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);

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

  // Filter applied via server-side URL state params
  const filteredAffiliates = affiliates;

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

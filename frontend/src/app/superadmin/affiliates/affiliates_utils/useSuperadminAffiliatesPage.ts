'use client';
// RESPONSIBILITY: useSuperadminAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
// DATA FLOW: superadminApi → useSuperadminAffiliatesPage → SuperadminAffiliatesClient
import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { affiliatesApi } from '@/app/superadmin/affiliates/superadmin_affiliates_api/superadmin_affiliates_api';
import { AffiliateSchema } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import type { Affiliate, AffiliateStatusFilter, AffiliateFormData } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { useSuperadminAffiliatesMutations } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutations';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

export const useSuperadminAffiliatesPage = () => {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();

  const searchQuery = getParam('search', '');
  const debouncedSearchQuery = useSuperadminDebouncedValue(searchQuery);
  const statusFilter = getParam('status', 'ALL') as AffiliateStatusFilter;
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const currentPage = Number(getParam('page', '1'));
  const pageLimit = Number(getParam('limit', '10'));

  const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
  const setStatusFilter = (val: AffiliateStatusFilter) => { setParam('status', val); setParam('page', '1'); };
  const setStartDate = (val: string) => { setParam('startDate', val); setParam('page', '1'); };
  const setEndDate = (val: string) => { setParam('endDate', val); setParam('page', '1'); };
  const setPage = (page: number) => setParam('page', String(page));

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: String(pageLimit),
    };
    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return params;
  }, [debouncedSearchQuery, statusFilter, startDate, endDate, currentPage, pageLimit]);

  const queryKey = useMemo(() => ['superadmin', 'affiliates', queryParams], [queryParams]);
  const { data: affiliatesResponse, status: fetchState, error: queryError } = useQuery({
    queryKey,
    queryFn: () => affiliatesApi.fetchAffiliates(queryParams),
  });
  const affiliates = affiliatesResponse?.data ?? [];
  const total = affiliatesResponse?.meta?.total ?? affiliates.length;
  const totalPages = Math.ceil(total / pageLimit) || 1;
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

  const {
    isMutating,
    handleAddAffiliate,
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    handlePayCommission,
  } = useSuperadminAffiliatesMutations(
    updateCachedAffiliates,
    setIsModalOpen,
    setEditingAffiliate,
    form,
    editingAffiliate
  );

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

  const filteredAffiliates = affiliates;

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
    currentPage,
    totalPages,
    setPage,
  };
};


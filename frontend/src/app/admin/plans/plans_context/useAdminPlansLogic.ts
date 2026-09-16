"use client";

import { useAdminPlansStore } from '@/app/admin/plans/plans_store/useAdminPlansStore';
import { buildAdminPlansQueryString } from '@/app/admin/plans/plans_utils/AdminPlansUrlState';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';
// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plansApi } from '@/app/admin/plans/plans_api/AdminPlansApi';
import type { Plan, PlansContextType, PlansInitialData } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { ApiResponse } from '@/lib/api';
import { EMPTY_PLAN_FORM, type PlanFormValues } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useAdminPlansLogic(initialData?: PlansInitialData | null): PlansContextType {
  const { confirm } = useAdminConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const search = searchParams.get('search') || '';
  const tierFilter = searchParams.get('tier') || 'All';
  const currentPage = Number(searchParams.get('page')) || 1;

  const updateUrl = useCallback((update: Parameters<typeof buildAdminPlansQueryString>[1]) => {
    router.push(buildAdminPlansQueryString(searchParams, update), { scroll: false });
  }, [router, searchParams]);

  const setSearch = useCallback((val: string) => updateUrl({ search: val || null }), [updateUrl]);
  const setTierFilter = useCallback((val: string) => updateUrl({ tier: val === 'All' ? null : val }), [updateUrl]);
  const setCurrentPage = useCallback((page: number) => updateUrl({ page }), [updateUrl]);

  const { showModal, setShowModal, editId, setEditId, form, setForm } = useAdminPlansStore();
  const { showToast } = useAdminToastStore();


  const plansQuery = useQuery({
    queryKey: ['admin', 'plans', 'list'],
    queryFn: () => plansApi.fetchAllPlans(),
    initialData: initialData ? { success: true, message: 'SSR', data: initialData.plans } : undefined,
  });

  const status = plansQuery.status;

  let fetchedPlans = plansQuery.data?.data || [];
  
  if (tierFilter !== 'All') {
    fetchedPlans = fetchedPlans.filter((p: Plan) => p.tier === tierFilter);
  }

  const openAdd = useCallback(() => {
    setEditId(null);
    setForm(EMPTY_PLAN_FORM);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((p: Plan) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      tier: p.tier,
      price1Month: String(p.price1Month),
      price3Month: String(p.price3Month),
      price6Month: String(p.price6Month),
      price12Month: String(p.price12Month),
      priceCustom: String((p as Plan & { priceCustom?: number }).priceCustom || 0),
      features: p.features.join('\n'),
    });
    setShowModal(true);
  }, []);

  const createMutation = useMutation({
    mutationFn: (payload: Partial<Plan>) => plansApi.createPlan(payload),
    onSuccess: (res: ApiResponse<Plan>) => {
      showToast(res.message, 'success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<Plan> }) => plansApi.updatePlan(id, payload),
    onSuccess: (res: ApiResponse<Plan>) => {
      showToast(res.message, 'success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => plansApi.deletePlan(id),
    onSuccess: (res: ApiResponse<unknown>) => {
      showToast(res.message, 'success');
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error')
  });

  const savePlan = useCallback(async (data: PlanFormValues) => {
    const payload: Partial<Plan> & { priceCustom?: number } = {
      name: data.name,
      tier: data.tier,
      price1Month: Number(data.price1Month),
      price3Month: Number(data.price3Month),
      price6Month: Number(data.price6Month),
      price12Month: Number(data.price12Month),
      priceCustom: Number(data.priceCustom),
      isActive: true,
      features: data.features.split('\n').map((s: string) => s.trim()).filter(Boolean),
    };

    if (editId) {
      updateMutation.mutate({ id: editId, payload });
    } else {
      createMutation.mutate(payload);
    }
  }, [editId, createMutation, updateMutation]);

  const deletePlan = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Delete Plan', message: 'Are you sure you want to delete this plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    deleteMutation.mutate(id);
  }, [confirm, deleteMutation]);

  const saving = createMutation.isPending || updateMutation.isPending;

  return {
    plans: fetchedPlans, status, saving, toast: null,
    search, setSearch, tierFilter, setTierFilter, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast: () => {}, loadPlans: async () => {}, // Mocked for context
    openAdd, openEdit, savePlan, deletePlan,
  };
}

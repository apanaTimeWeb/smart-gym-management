"use client";

import { useAdminPlansStore } from '@/app/admin/plans/plans_store/useAdminPlansStore';
import { buildAdminPlansQueryString } from '@/app/admin/plans/plans_utils/AdminPlansUrlState';
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';
// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plansApi } from '@/app/admin/plans/plans_api/AdminPlansApi';
import type { Plan, PlansContextType, PlansInitialData } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import type { ApiResponse } from '@/lib/api';
import { EMPTY_PLAN_FORM } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';
import type { PlanFormValues } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/** Coordinates PlansLogic state, data flow, and feature behavior. */
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

  const setSearch = useCallback((val: string) => updateUrl({ search: val || null, page: 1 }), [updateUrl]);
  const setTierFilter = useCallback((val: string) => updateUrl({ tier: val === 'All' ? null : val, page: 1 }), [updateUrl]);
  const setCurrentPage = useCallback((page: number) => updateUrl({ page }), [updateUrl]);

  const { showModal, setShowModal, editId, setEditId, form, setForm } = useAdminPlansStore();
  const { showToast } = useAdminToastStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);


  const plansQuery = useQuery({
    queryKey: ['admin', 'plans', 'list', { search, tier: tierFilter, page: currentPage, limit: 10 }],
    queryFn: () => plansApi.fetchAllPlans({ search, tier: tierFilter === 'All' ? undefined : tierFilter, page: currentPage, limit: 10 }),
    initialData: !search && tierFilter === 'All' && currentPage === 1 && initialData
      ? { success: true as const, message: 'SSR', data: initialData.plans, meta: { total: initialData.plans.length, page: 1, limit: 10, totalPages: Math.max(1, Math.ceil(initialData.plans.length / 10)) } }
      : undefined,
  });

  const status = plansQuery.status;
  const fetchedPlans = plansQuery.data?.data ?? [];
  const totalItems = plansQuery.data?.meta?.total ?? fetchedPlans.length;
  const totalPages = plansQuery.data?.meta?.totalPages ?? Math.max(1, Math.ceil(totalItems / 10));

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
      showToast(res.message, 'success', 'plans-create-success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error', 'plans-create-error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<Plan> }) => plansApi.updatePlan(id, payload),
    onSuccess: (res: ApiResponse<Plan>) => {
      showToast(res.message, 'success', 'plans-update-success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error', 'plans-update-error')
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => plansApi.deletePlan(id, idempotencyKey),
    onSuccess: (res: ApiResponse<unknown>, variables) => {
      showToast(res.message, 'success', 'plans-delete-success');
      idempotencyKeysRef.current.delete(`delete-plan:${variables.id}`);
      queryClient.invalidateQueries({ queryKey: ['admin', 'plans', 'list'] });
    },
    onError: (err) => showToast((err as Error).message, 'error', 'plans-delete-error')
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
    const intentId = `delete-plan:${id}`;
    const isConfirmed = await confirm({ title: 'Delete Plan', message: 'Are you sure you want to delete this plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) { clearIntentKey(intentId); return; }
    deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [confirm, clearIntentKey, deleteMutation, getIntentKey]);

  const saving = createMutation.isPending || updateMutation.isPending;
  const loadPlans = useCallback(async () => {
    await plansQuery.refetch();
  }, [plansQuery]);

  return {
    plans: fetchedPlans, status, saving, toast: null, totalItems, totalPages,
    search, setSearch, tierFilter, setTierFilter, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan,
  };
}

"use client";

// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.


import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansQueryKeys';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore';
import { buildAdminPlansQueryString } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansUrlState';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansMutations';
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminPlansApi } from '@/app/frontend_admin/admin_plans/admin_plans_api/AdminPlansApi';
import type { Plan, PlansContextType } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
import type { ApiResponse } from '@/lib/api';
import { EMPTY_PLAN_FORM } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansConstants';
import type { PlanFormValues } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { useQuery } from '@tanstack/react-query';
/**
 * @description useAdminPlansLogic: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
 * @dependencies Consumes AdminPlansQueryKeys, useAdminPlansStore, AdminPlansUrlState, useAdminLayoutToastStore, useAdminPlansMutations, AdminPlansApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPlansLogic(): PlansContextType {
  const { confirm } = useAdminLayoutConfirm();
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const { showToast } = useAdminLayoutToastStore();

  const plansQuery = useQuery({
    queryKey: ADMIN_PLANS_QUERY_KEYS.key('list', { search, tier: tierFilter, page: currentPage, limit: 10 }),
    queryFn: () => AdminPlansApi.fetchAllPlans({ search, tier: tierFilter === 'All' ? undefined : tierFilter, page: currentPage, limit: 10 }),
  });

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

  const { createMutation, updateMutation, deleteMutation, getIntentKey, clearIntentKey } = useAdminPlansMutations();

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
      const intentId = `update-plan:${editId}`;
      updateMutation.mutate({ id: editId, payload, idempotencyKey: getIntentKey(intentId) });
    } else {
      createMutation.mutate({ payload, idempotencyKey: getIntentKey('create-plan') });
    }
  }, [editId, createMutation, getIntentKey, updateMutation]);

  const deletePlan = useCallback(async (id: string) => {
    const intentId = `delete-plan:${id}`;
    const isConfirmed = await confirm({ title: t('plans.AdminPlansConfirm.deleteTitle'), message: t('plans.AdminPlansConfirm.deleteMessage'), confirmText: t('plans.AdminPlansConfirm.deleteConfirm'), type: 'danger' });
    if (!isConfirmed) { clearIntentKey(intentId); return; }
    deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [confirm, clearIntentKey, deleteMutation, getIntentKey]);

  const saving = createMutation.isPending || updateMutation.isPending;
  const loadPlans = useCallback(async () => {
    await plansQuery.refetch();
  }, [plansQuery]);

  return {
    plans: fetchedPlans, status: plansQuery.status, saving, toast: null, totalItems, totalPages,
    search, setSearch, tierFilter, setTierFilter, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan,
  };
}
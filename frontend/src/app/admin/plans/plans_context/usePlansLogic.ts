// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plansApi } from '@/app/admin/plans/plans_api/plans_api';
import type { Plan, PlansContextType, PlansInitialData, FetchState } from '@/app/admin/plans/plans_types/plans_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { EMPTY_PLAN_FORM, type PlanFormValues } from '@/app/admin/plans/plans_utils/PlansSharedConstants';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function usePlansLogic(initialData?: PlansInitialData | null): PlansContextType {
  const { confirm } = useAdminConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set('search', val); params.set('page', '1'); }
    else { params.delete('search'); params.set('page', '1'); }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PlanFormValues>(EMPTY_PLAN_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => {
    if (t === 'error') toast.error(msg);
    else toast.success(msg);
  }, []);
  const hideToast = useCallback(() => {}, []);

  const { data: plansRes, isLoading, isError } = useQuery({
    queryKey: ['adminPlans'],
    queryFn: () => plansApi.fetchAllPlans(),
  });

  const fetchState: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  // Fallback to mock data if API fails or returns nothing initially, to keep the UI functional as before
  const fetchedPlans = plansRes?.data || [
    { id: '1', name: 'Basic Tier', tier: 'Basic', price1Month: 50, price3Month: 140, price6Month: 250, price12Month: 450, features: ['Gym Access', 'Locker Room'], isActive: true },
    { id: '2', name: 'Pro Tier', tier: 'Pro', price1Month: 80, price3Month: 220, price6Month: 400, price12Month: 750, features: ['Gym Access', 'Classes', 'Sauna'], isActive: true },
    { id: '3', name: 'Elite Tier', tier: 'Elite', price1Month: 120, price3Month: 330, price6Month: 600, price12Month: 1100, features: ['All Access', 'Personal Trainer', 'Diet Plan'], isActive: true },
  ];

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
    onSuccess: (res) => {
      showToast(res.message || 'Plan created', 'success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
    },
    onError: (err) => showToast((err as Error).message, 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<Plan> }) => plansApi.updatePlan(id, payload),
    onSuccess: (res) => {
      showToast(res.message || 'Plan updated', 'success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
    },
    onError: (err) => showToast((err as Error).message, 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => plansApi.deletePlan(id),
    onSuccess: (res) => {
      showToast(res.message || 'Plan deleted', 'success');
      queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
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
    plans: fetchedPlans, fetchState, saving, toast: null,
    search, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast, loadPlans: async () => {}, // Mocked for context
    openAdd, openEdit, savePlan, deletePlan,
  };
}

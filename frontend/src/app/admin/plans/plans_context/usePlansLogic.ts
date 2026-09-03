// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
// DATA FLOW: plansApi -> usePlansLogic -> PlansContext -> PlansGrid, PlanModal, PlansToolbar
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plansApi } from '@/app/admin/plans/plans_api/plans_api';
import type { Plan, PlansContextType, PlansInitialData, FetchState } from '@/app/admin/plans/plans_types/plans_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { EMPTY_PLAN_FORM, type PlanFormValues } from '@/app/admin/plans/plans_utils/PlansSharedConstants';
import { useConfirm } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';

/**
 * Hook to manage plans data, pagination state, and all CRUD operations.
 */
export function usePlansLogic(initialData?: PlansInitialData | null): PlansContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [plans, setPlans] = useState<Plan[]>(initialData?.plans || []);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

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

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadPlans = useCallback(async () => {
    setFetchState('success');
    setPlans([
      { id: '1', name: 'Basic Tier', tier: 'Basic', price1Month: 50, price3Month: 140, price6Month: 250, price12Month: 450, features: ['Gym Access', 'Locker Room'], isActive: true },
      { id: '2', name: 'Pro Tier', tier: 'Pro', price1Month: 80, price3Month: 220, price6Month: 400, price12Month: 750, features: ['Gym Access', 'Classes', 'Sauna'], isActive: true },
      { id: '3', name: 'Elite Tier', tier: 'Elite', price1Month: 120, price3Month: 330, price6Month: 600, price12Month: 1100, features: ['All Access', 'Personal Trainer', 'Diet Plan'], isActive: true },
    ]);
  }, []);

  // Fetch plans on mount; skip if SSR initialData was provided
  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    loadPlans();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

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

  const savePlan = useCallback(async (data: PlanFormValues) => {
    setSaving(true);
    try {
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
        const res = await plansApi.update(editId, payload);
        const updatedPlan = res.data || payload;
        setPlans(prev => prev.map(p => p.id === editId ? { ...p, ...updatedPlan } as Plan : p));
        showToast(res.message || 'Plan updated', 'success');
      } else {
        const res = await plansApi.create(payload);
        const newPlan = res.data ? res.data : { id: `p${Date.now()}`, ...payload };
        setPlans(prev => [newPlan as Plan, ...prev]);
        showToast(res.message || 'Plan created', 'success');
      }
      setShowModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editId, showToast]);

  const deletePlan = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Delete Plan', message: 'Are you sure you want to delete this plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await plansApi.remove(id);
      setPlans(prev => prev.filter(p => p.id !== id));
      showToast(res.message || 'Plan deleted', 'success');
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [showToast, confirm]);

  return {
    plans, fetchState, saving, toast,
    search, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan,
  };
}

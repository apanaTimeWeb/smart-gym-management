// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
// DATA FLOW: plansApi -> usePlansLogic -> PlansContext -> PlansGrid, PlanModal, PlansToolbar
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plansApi } from '@/app/erp/plans/plans_api/plans_api';
import type { Plan, PlansContextType, PlansInitialData } from '@/app/erp/plans/plans_types/plans_types';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_PLAN_FORM, type PlanFormValues } from '@/app/erp/plans/plans_utils/PlansSharedConstants';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

/**
 * Hook to manage plans data, pagination state, and all CRUD operations.
 */
export function usePlansLogic(initialData?: PlansInitialData | null): PlansContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [plans, setPlans] = useState<Plan[]>(initialData?.plans || []);
  const [loading, setLoading] = useState(!initialData);
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
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<PlanFormValues>(EMPTY_PLAN_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadPlans = useCallback(async () => {
    setLoading(true);
    try {
      const res = await plansApi.getAll();
      const data = res.data;
      setPlans(Array.isArray(data) ? data : (data as { plans?: Plan[] })?.plans || []);
    } catch (e) {
      showToast((e as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Fetch plans on mount; skip if SSR initialData was provided
  useEffect(() => {
    if (initialData) return;
    loadPlans();
  }, [loadPlans, initialData]);

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
        showToast(res.message || 'Plan updated', 'success');
      } else {
        const res = await plansApi.create(payload);
        showToast(res.message || 'Plan created', 'success');
      }
      setShowModal(false);
      await loadPlans();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editId, loadPlans, showToast]);

  const deletePlan = useCallback(async (id: number) => {
    const isConfirmed = await confirm({ title: 'Delete Plan', message: 'Are you sure you want to delete this plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await plansApi.remove(id);
      showToast(res.message || 'Plan deleted', 'success');
      await loadPlans();
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [loadPlans, showToast, confirm]);

  return {
    plans, loading, saving, toast,
    search, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan,
  };
}

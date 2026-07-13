import { useState, useCallback, useEffect } from 'react';
import { plansApi, type Plan } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_PLAN_FORM, PlanFormValues } from '@/app/erp/plans/plans_utils/PlansSharedConstants';
import { PlansContextType } from '@/app/erp/plans/plans_types/plans_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export function usePlansLogic(): PlansContextType {
  const { confirm } = useConfirm();
 const [plans, setPlans] = useState<Plan[]>([]);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
 const [form, setForm] = useState(EMPTY_PLAN_FORM);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const loadPlans = useCallback(async () => {
 setLoading(true);
 try {
 const res = await plansApi.getAll();
 setPlans(res.data);
 } catch (e) { 
 showToast((e as Error).message, 'error'); 
 } finally { 
 setLoading(false); 
 }
 }, [showToast]);

 useEffect(() => { loadPlans(); }, [loadPlans]);

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
 priceCustom: String((p as any).priceCustom || 0),
 features: p.features.join('\n') 
 });
 setShowModal(true);
 }, []);

  const savePlan = useCallback(async (data: PlanFormValues) => {
    setSaving(true);
    try {
      const payload = {
        name: data.name, 
        tier: data.tier,
        price1Month: Number(data.price1Month), 
        price3Month: Number(data.price3Month), 
        price6Month: Number(data.price6Month), 
        price12Month: Number(data.price12Month),
        priceCustom: Number(data.priceCustom),
        isActive: true,
        features: data.features.split('\n').map(s => s.trim()).filter(Boolean)
      };
 
 if (editId) { 
 const res = await plansApi.update(editId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await plansApi.create(payload); 
 showToast((res as any).message, 'success'); 
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
 showToast((res as any).message, 'success'); 
 await loadPlans(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadPlans, showToast]);

  return {
    plans, loading, saving, toast,
    search, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast, loadPlans,
 openAdd, openEdit, savePlan, deletePlan
 };
}

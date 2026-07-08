"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { plansApi, type Plan } from '@/lib/api';
import type { ToastType } from '@/components/Toast';
import { EMPTY_PLAN_FORM } from '../plans_utils/PlansSharedConstants';

interface PlansContextType {
  plans: Plan[];
  loading: boolean;
  saving: boolean;
  toast: { message: string; type: ToastType } | null;
  
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: number | null;
  form: typeof EMPTY_PLAN_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_PLAN_FORM>>;
  
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  
  loadPlans: () => Promise<void>;
  openAdd: () => void;
  openEdit: (p: Plan) => void;
  savePlan: (e: React.FormEvent) => Promise<void>;
  deletePlan: (id: number) => Promise<void>;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

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
      features: p.features.join('\n') 
    });
    setShowModal(true);
  }, []);

  const savePlan = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      const payload = {
        name: form.name, 
        tier: form.tier,
        price1Month: Number(form.price1Month), 
        price3Month: Number(form.price3Month), 
        price6Month: Number(form.price6Month), 
        price12Month: Number(form.price12Month),
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean)
      };
      
      if (editId) { 
        await plansApi.update(editId, payload); 
        showToast('Plan updated!', 'success'); 
      } else { 
        await plansApi.create(payload); 
        showToast('Plan created!', 'success'); 
      }
      setShowModal(false); 
      await loadPlans();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editId, form, loadPlans, showToast]);

  const deletePlan = useCallback(async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try { 
      await plansApi.remove(id); 
      showToast('Plan deleted!', 'success'); 
      await loadPlans(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadPlans, showToast]);

  const value = useMemo(() => ({
    plans, loading, saving, toast,
    showModal, setShowModal, editId, form, setForm,
    showToast, hideToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan
  }), [
    plans, loading, saving, toast,
    showModal, editId, form,
    showToast, hideToast, loadPlans,
    openAdd, openEdit, savePlan, deletePlan
  ]);

  return (
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlansContext() {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlansContext must be used within a PlansProvider');
  }
  return context;
}

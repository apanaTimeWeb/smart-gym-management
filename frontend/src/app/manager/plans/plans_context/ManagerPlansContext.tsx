'use client';
// RESPONSIBILITY: React Context — bridges TanStack Query plans with UI state (search, filters, modal) synced to URL.
// DATA FLOW: URL → usePlansContext → useManagerPlansQueries → API
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchPlans, useRequestPlanChange } from '@/app/manager/plans/plans_api/useManagerPlansQueries';
import toast from 'react-hot-toast';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import { MANAGER_PLANS_MESSAGES } from '@/app/manager/plans/plans_utils/ManagerPlansSharedConstants';

interface PlansContextValue {
  plans: Plan[];
  fetchState: 'idle' | 'loading' | 'error' | 'success';
  saving: boolean;
  search: string;
  setSearch: (v: string) => void;
  tierFilter: string;
  setTierFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  filteredPlans: Plan[];
  // Change-request modal
  requestModalPlan: Plan | null;
  openRequestModal: (plan: Plan) => void;
  closeRequestModal: () => void;
  submitChangeRequest: (note: string) => Promise<void>;
  activeTab: string;
  setActiveTab: (v: string) => void;
}

const ManagerPlansContext = createContext<PlansContextValue | undefined>(undefined);

export function PlansProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL state
  const search = searchParams.get('search') || '';
  const tierFilter = searchParams.get('tier') || 'ALL';
  const statusFilter = searchParams.get('status') || 'ALL';
  const activeTab = searchParams.get('tab') || 'View Plans';

  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL' && value !== 'View Plans') params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  const setSearch = useCallback((v: string) => updateUrl('search', v), [updateUrl]);
  const setTierFilter = useCallback((v: string) => updateUrl('tier', v), [updateUrl]);
  const setStatusFilter = useCallback((v: string) => updateUrl('status', v), [updateUrl]);
  const setActiveTab = useCallback((v: string) => updateUrl('tab', v), [updateUrl]);

  const [requestModalPlan, setRequestModalPlan] = useState<Plan | null>(null);

  const { data: plans = [], status } = useFetchPlans();
  const { mutateAsync: requestChange, isPending: saving } = useRequestPlanChange();

  const fetchState = status === 'pending' ? 'loading' : status;

  const filteredPlans = useMemo(() => plans.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.name?.toLowerCase().includes(q) || p.tier?.toLowerCase().includes(q);
    const matchTier = tierFilter === 'ALL' || p.tier === tierFilter;
    const matchStatus = statusFilter === 'ALL' || (statusFilter === 'ACTIVE' ? p.isActive : !p.isActive);
    return matchSearch && matchTier && matchStatus;
  }), [plans, search, tierFilter, statusFilter]);

  const openRequestModal = useCallback((plan: Plan) => setRequestModalPlan(plan), []);
  const closeRequestModal = useCallback(() => setRequestModalPlan(null), []);

  const submitChangeRequest = useCallback(async (note: string) => {
    if (!requestModalPlan) return;
    try {
      await requestChange({ planId: requestModalPlan.id, note });
      toast.success(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_SUCCESS);
      setRequestModalPlan(null);
    } catch {
      toast.error(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_ERROR);
    }
  }, [requestModalPlan, requestChange]);

  return (
    <ManagerPlansContext.Provider value={{
      plans, fetchState: fetchState as PlansContextValue['fetchState'], saving,
      search, setSearch,
      tierFilter, setTierFilter,
      statusFilter, setStatusFilter,
      filteredPlans,
      requestModalPlan, openRequestModal, closeRequestModal, submitChangeRequest,
      activeTab, setActiveTab
    }}>
      {children}
    </ManagerPlansContext.Provider>
  );
}

export function usePlansContext() {
  const ctx = useContext(ManagerPlansContext);
  if (!ctx) throw new Error('usePlansContext must be used within PlansProvider');
  return ctx;
}

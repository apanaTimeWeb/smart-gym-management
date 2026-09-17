'use client';
// RESPONSIBILITY: React Context — bridges TanStack Query plans with UI state (search, filters, modal) synced to URL.
// DATA FLOW: URL → usePlansContext → useManagerPlansQueries → API
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';
import type { ReactNode } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchPlans, useRequestPlanChange } from '@/app/manager/plans/plans_api/ManagerUseManagerPlansQueries';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';

interface PlansContextValue {
  plans: Plan[];
  isPending: boolean;
  isError: boolean;
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
  const debouncedSearch = useManagerDebounce(search, 300);

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

  const queryParams = useMemo(() => ({ search: debouncedSearch, tier: tierFilter, status: statusFilter }), [debouncedSearch, tierFilter, statusFilter]);
  const { data: plansData, status } = useFetchPlans(queryParams);
  const plans = plansData?.plans ?? [];
  const { mutateAsync: requestChange, isPending: saving } = useRequestPlanChange();

  const isPending = status === 'pending';
  const isError = status === 'error';

  const filteredPlans = plans;

  const openRequestModal = useCallback((plan: Plan) => setRequestModalPlan(plan), []);
  const closeRequestModal = useCallback(() => setRequestModalPlan(null), []);

  const submitChangeRequest = useCallback(async (note: string) => {
    if (!requestModalPlan) return;
    try {
      const response = await requestChange({ planId: requestModalPlan.id, note });
      showManagerSuccessToast(response.message, 'manager-plans-context-success');
      setRequestModalPlan(null);
    } catch (error: unknown) {
      showManagerErrorToast(error, 'manager-plans-context-error');
    }
  }, [requestModalPlan, requestChange]);

  return (
    <ManagerPlansContext.Provider value={{
      plans, isPending, isError, saving,
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

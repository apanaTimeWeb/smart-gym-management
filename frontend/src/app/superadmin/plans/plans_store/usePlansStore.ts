/**
 * RESPONSIBILITY: Zustand store for the Plans module. Manages all async API data, loading states, and modal UI state.
 * DATA FLOW: superadminApi → usePlansStore → PlansList / PlanCreateModal / PlanEditModal
 *
 * Rule 58: Async API data (plans[], fetchState) MUST live in Zustand, never in React Context.
 */
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type {
  SubscriptionPlan,
  CreatePlanPayload,
  UpdatePlanPayload,
  FetchState,
} from '@/app/superadmin/superadmin_types/superadmin_types';
import type { ApiResponse } from '@/lib/api';

interface PlansStoreState {
  // ── Data ──────────────────────────────────────────────────────────────────
  plans: SubscriptionPlan[];
  fetchState: FetchState;
  error: string | null;
  actionLoadingId: string | null;

  // ── Modal UI ──────────────────────────────────────────────────────────────
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPlan: SubscriptionPlan | null;

  // ── Actions ───────────────────────────────────────────────────────────────
  fetchPlans: () => Promise<void>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (plan: SubscriptionPlan) => void;
  closeEditModal: () => void;
  handleCreatePlan: (data: CreatePlanPayload) => Promise<void>;
  handleUpdatePlan: (id: string, data: UpdatePlanPayload) => Promise<void>;
  handleDeletePlan: (id: string) => Promise<void>;
}

export const usePlansStore = create<PlansStoreState>((set, get) => ({
  plans: [],
  fetchState: 'idle',
  error: null,
  actionLoadingId: null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedPlan: null,

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  openEditModal: (plan) => set({ selectedPlan: plan, isEditModalOpen: true }),
  closeEditModal: () => {
    set({ isEditModalOpen: false });
    // Delay clearing selectedPlan so modal exit animation completes
    setTimeout(() => set({ selectedPlan: null }), 200);
  },

  fetchPlans: async () => {
    set({ fetchState: 'loading', error: null });
    try {
      const res = await superadminApi.plans.getAll();
      set({ plans: res.data ?? [], fetchState: 'success' });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch plans';
      set({ fetchState: 'error', error: msg });
      toast.error(msg);
    }
  },

  handleCreatePlan: async (data) => {
    set({ actionLoadingId: 'create' });
    try {
      const res = await apiFetch<ApiResponse<SubscriptionPlan>>(
        SuperadminUrlConfig.BACKEND_API.PLANS_BASE,
        { method: 'POST', body: JSON.stringify(data) }
      );
      set(state => ({ plans: [...state.plans, res.data] }));
      toast.success(res.message || 'Plan created');
      get().closeCreateModal();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to create plan');
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleUpdatePlan: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      const res = await apiFetch<ApiResponse<SubscriptionPlan>>(
        `${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`,
        { method: 'PATCH', body: JSON.stringify(data) }
      );
      set(state => ({
        plans: state.plans.map(p => p.id === id ? { ...p, ...res.data } : p),
      }));
      toast.success(res.message || 'Plan updated');
      get().closeEditModal();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to update plan');
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleDeletePlan: async (id) => {
    set({ actionLoadingId: id });
    try {
      const res = await apiFetch<ApiResponse<null>>(
        `${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`,
        { method: 'DELETE' }
      );
      set(state => ({ plans: state.plans.filter(p => p.id !== id) }));
      toast.success(res.message || 'Plan deleted');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete plan');
    } finally {
      set({ actionLoadingId: null });
    }
  },
}));

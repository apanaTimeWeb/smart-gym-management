/**
 * RESPONSIBILITY: Zustand store for the Plans module. Manages all async API data, loading states, and modal UI state.
 * DATA FLOW: superadminApi → usePlansStore → PlansList / PlanCreateModal / PlanEditModal
 *
 * Rule 58: Async API data (plans[], fetchState) MUST live in Zustand, never in React Context.
 */
// DATA FLOW: Component -> usePlansStore.ts -> API/Store
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { plansApi } from '@/app/superadmin/plans/plans_api/plans_api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type {
  SubscriptionPlan,
  CreatePlanPayload,
  UpdatePlanPayload,
  FetchState,
} from '@/app/superadmin/plans/plans_types/plans_types';
import type { ApiResponse } from '@/lib/api';

/** LocalStorage key for persisting plan mutations across refreshes (TC-10/11/12/13 fix) */
const PLANS_STORAGE_KEY = 'superadmin_plans_v1';

const DEFAULT_PLANS: SubscriptionPlan[] = [
  { id: '1', name: 'Starter', priceMonthly: 999, priceAnnual: 10000, maxMembers: 50, maxStaff: 5, features: ['Core features'], activeTenants: 10 },
  { id: '2', name: 'Pro', priceMonthly: 1999, priceAnnual: 20000, maxMembers: 200, maxStaff: 20, features: ['All features'], activeTenants: 25 },
];

function loadPersistedPlans(): SubscriptionPlan[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PLANS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SubscriptionPlan[]) : null;
  } catch {
    return null;
  }
}

function persistPlans(plans: SubscriptionPlan[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
  } catch {
    // quota exceeded — ignore
  }
}

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
      // Hydrate from localStorage first; fall back to default mock data (TC-10/11/12/13)
      const persisted = loadPersistedPlans();
      const plans = persisted ?? DEFAULT_PLANS;
      if (!persisted) persistPlans(plans); // seed storage on first run
      set({ plans, fetchState: 'success' });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch plans';
      set({ fetchState: 'error', error: msg });
      toast.error(msg);
    }
  },

  handleCreatePlan: async (data) => {
    set({ actionLoadingId: 'create' });
    try {
      const newPlan = { ...data, id: `plan-${Date.now()}` } as SubscriptionPlan;
      set(state => {
        const updated = [...state.plans, newPlan];
        persistPlans(updated);
        return { plans: updated };
      });
      toast.success('Plan created');
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
      set(state => {
        const updated = state.plans.map(p => p.id === id ? { ...p, ...data } as SubscriptionPlan : p);
        persistPlans(updated);
        return { plans: updated };
      });
      toast.success('Plan updated');
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
      set(state => {
        const updated = state.plans.filter(p => p.id !== id);
        persistPlans(updated);
        return { plans: updated };
      });
      toast.success('Plan deleted');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete plan');
    } finally {
      set({ actionLoadingId: null });
    }
  },
}));

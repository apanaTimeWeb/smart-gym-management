// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Plans feature.
import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_types/SuperadminPlansTypes';

export interface SuperadminPlansStoreState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPlan: SubscriptionPlan | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (plan: SubscriptionPlan) => void;
  closeEditModal: () => void;
}

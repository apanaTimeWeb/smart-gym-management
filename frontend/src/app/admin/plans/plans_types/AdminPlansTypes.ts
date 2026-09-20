import type { QueryStatus } from '@tanstack/react-query';
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module. Single source of truth for plan data shapes.

import type { AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';


export interface PlansInitialData {
  plans: Plan[];
}

export interface PlansContextType {
  plans: Plan[];
  totalItems: number;
  totalPages: number;
  status: QueryStatus;
  saving: boolean;
  toast: { message: string; type: AdminToastType } | null;

  search: string;
  setSearch: (s: string) => void;
  tierFilter: string;
  setTierFilter: (t: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  form: PlanFormValues;
  setForm: (form: PlanFormValues) => void;

  showToast: (msg: string, t: AdminToastType) => void;
  loadPlans: () => Promise<void>;
  openAdd: () => void;
  openEdit: (p: Plan) => void;
  savePlan: (data: PlanFormValues) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
}

export interface Plan {
  id: string; name: string; tier: string;
  price1Month: number; price3Month: number;
  price6Month: number; price12Month: number;
  features: string[]; isActive: boolean;
  freezeAllowed?: boolean;
  joiningFee?: number;
  ptSessionsIncluded?: number;
  taxRate?: number;
}


export type PlanFormValues = { name: string; tier: string; price1Month: string; price3Month: string; price6Month: string; price12Month: string; priceCustom: string; features: string };

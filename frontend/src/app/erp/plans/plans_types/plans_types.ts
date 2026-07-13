// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module. Single source of truth for plan data shapes.

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { PlanFormValues } from '@/app/erp/plans/plans_utils/PlansSharedConstants';
import React from 'react';

export interface PlansInitialData {
  plans: Plan[];
}

export interface PlansContextType {
  plans: Plan[];
  loading: boolean;
  saving: boolean;
  toast: { message: string; type: ToastType } | null;

  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: number | null;
  form: PlanFormValues;
  setForm: React.Dispatch<React.SetStateAction<PlanFormValues>>;

  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;

  loadPlans: () => Promise<void>;
  openAdd: () => void;
  openEdit: (p: Plan) => void;
  savePlan: (data: PlanFormValues) => Promise<void>;
  deletePlan: (id: number) => Promise<void>;
}

export interface Plan {
  id: number; name: string; tier: string;
  price1Month: number; price3Month: number;
  price6Month: number; price12Month: number;
  features: string[]; isActive: boolean;
}

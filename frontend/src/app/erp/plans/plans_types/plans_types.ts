// RESPONSIBILITY: plans_types.ts handles the logic and UI for its corresponding feature.

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_PLAN_FORM } from '@/app/erp/plans/plans_utils/PlansSharedConstants';
import React from 'react';

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
 form: typeof EMPTY_PLAN_FORM;
 setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_PLAN_FORM>>;
 
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 
 loadPlans: () => Promise<void>;
 openAdd: () => void;
 openEdit: (p: Plan) => void;
 savePlan: (data: any) => Promise<void>;
 deletePlan: (id: number) => Promise<void>;
}

export interface Plan {
  id: number; name: string; tier: string;
  price1Month: number; price3Month: number;
  price6Month: number; price12Month: number;
  features: string[]; isActive: boolean;
}

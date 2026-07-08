import { type Plan } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_PLAN_FORM } from '@/app/(erp)/plans/plans_utils/PlansSharedConstants';
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
 savePlan: (e: React.FormEvent) => Promise<void>;
 deletePlan: (id: number) => Promise<void>;
}

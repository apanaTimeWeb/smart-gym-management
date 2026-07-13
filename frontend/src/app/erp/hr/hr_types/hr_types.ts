// RESPONSIBILITY: Defines the TypeScript types and interfaces for the HR module.
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_STAFF } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import React from 'react';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface HrInitialData {
  staff: Staff[];
  payrolls: Payroll[];
  summary: HrSummary | null;
}

export interface HrContextType {
 staff: Staff[];
 payrolls: Payroll[];
 summary: HrSummary | null;
 fetchState: FetchState;
 error: string;
  toast: { message: string; type: ToastType } | null;
  
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
 loadAll: () => Promise<void>;
 
 // Form / Modal State
 showModal: boolean;
 setShowModal: (show: boolean) => void;
 showPayrollModal: boolean;
 setShowPayrollModal: (show: boolean) => void;
 editId: number | null;
 editData: Partial<Staff> | null;
 saving: boolean;
 
 // Actions
 openAdd: () => void;
 openEdit: (s: Staff) => void;
 openAddPayroll: () => void;
 saveStaff: (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => Promise<void>;
 savePayroll: (data: Partial<Payroll> & { amount?: string | number }) => Promise<void>;
 deleteStaff: (id: number) => Promise<void>;
 markPayrollPaid: (id: number) => Promise<void>;
}

export interface Staff {
  id: number; name: string; email: string; phone: string;
  role: string; salary: number; branch: string; gender: string;
  address?: string; joinDate: string; isActive: boolean;
}
export interface Payroll {
  id: number; staffId: number; month: string; amount: number;
  status: string; paidAt?: string; notes?: string;
  staff?: { name: string; role: string };
}
export interface HrSummary {
  totalStaff: number; activeStaff: number;
  totalPayrollThisMonth: number; paidCount: number; pendingCount: number;
}

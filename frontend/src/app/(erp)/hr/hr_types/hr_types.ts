import { type Staff, type Payroll, type HrSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_STAFF } from '@/app/(erp)/hr/hr_utils/HrSharedConstants';
import React from 'react';

export interface HrContextType {
 staff: Staff[];
 payrolls: Payroll[];
 summary: HrSummary | null;
 loading: boolean;
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
 editId: number | null;
 editData: any;
 saving: boolean;
 
 // Actions
 openAdd: () => void;
 openEdit: (s: Staff) => void;
 saveStaff: (data: any) => Promise<void>;
 deleteStaff: (id: number) => Promise<void>;
 markPayrollPaid: (id: number) => Promise<void>;
}

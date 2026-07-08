import { type Staff, type Payroll, type HrSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_STAFF } from '../hr_utils/HrSharedConstants';
import React from 'react';

export interface HrContextType {
 staff: Staff[];
 payrolls: Payroll[];
 summary: HrSummary | null;
 loading: boolean;
 error: string;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;
 
 // Form / Modal State
 showModal: boolean;
 setShowModal: (show: boolean) => void;
 editId: number | null;
 form: typeof EMPTY_STAFF;
 setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_STAFF>>;
 saving: boolean;
 
 // Actions
 openAdd: () => void;
 openEdit: (s: Staff) => void;
 saveStaff: (e: React.FormEvent) => Promise<void>;
 deleteStaff: (id: number) => Promise<void>;
 markPayrollPaid: (id: number) => Promise<void>;
}

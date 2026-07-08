import { type Payment, type FinanceSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';

export interface FinanceContextType {
 payments: Payment[];
 summary: FinanceSummary | null;
 loading: boolean;
 error: string;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;
 showModal: boolean;
 setShowModal: (show: boolean) => void;
}

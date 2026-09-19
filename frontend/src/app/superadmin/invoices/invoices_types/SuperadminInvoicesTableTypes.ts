// RESPONSIBILITY: Type contract extracted from SuperadminInvoicesTable.tsx; no business behavior.
import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesTypes';

export interface SuperadminInvoicesTableProps {
    invoices: SaaSInvoice[];
    onLogPaymentClick: () => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

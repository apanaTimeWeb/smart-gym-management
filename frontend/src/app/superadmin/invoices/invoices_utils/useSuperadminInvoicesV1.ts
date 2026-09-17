// DATA FLOW: MSW/Backend → fetchInvoiceRecoveryCenter() → TanStack Query → Payment Recovery & Billing Adjustments UI
// RESPONSIBILITY: Owns query orchestration for Payment Recovery & Billing Adjustments. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchInvoiceRecoveryCenter } from '@/app/superadmin/invoices/invoices_api/superadmin_invoices_recovery_center_api';
export function useSuperadminInvoicesV1() {
    return useQuery({ queryKey: ['superadmin', 'invoices_recovery_center'], queryFn: fetchInvoiceRecoveryCenter });
}

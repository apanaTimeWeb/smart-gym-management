// DATA FLOW: MSW/Backend → fetchInvoiceRecoveryCenter() → TanStack Query → Payment Recovery & Billing Adjustments UI
// RESPONSIBILITY: Owns query orchestration for Payment Recovery & Billing Adjustments. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchInvoiceRecoveryCenter } from '@/app/superadmin/invoices/invoices_api/SuperadminInvoicesRecoveryCenterApi';
/**
 * Purpose: Owns query orchestration for Payment Recovery & Billing Adjustments. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminInvoicesV1() {
    return useQuery({ queryKey: ['superadmin', 'invoices_recovery_center'], queryFn: fetchInvoiceRecoveryCenter });
}

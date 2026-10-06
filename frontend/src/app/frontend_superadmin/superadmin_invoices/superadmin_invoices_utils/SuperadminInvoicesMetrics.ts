/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminInvoicesMetrics owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';

import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes';


// RESPONSIBILITY: Computes derived invoice totals from the current server response. No API or UI state ownership.
/**
 * @description Provides invoices formatting or feature utility behavior for calculateSuperadminInvoiceMetrics.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function calculateSuperadminInvoiceMetrics(invoices: SaaSInvoice[]) {
    const totalRevenue = invoices.filter(i => i.status === SUPERADMIN_INVOICE_STATUS_CODES.PAID).reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const failedRevenue = invoices.filter(i => i.status === SUPERADMIN_INVOICE_STATUS_CODES.FAILED).reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const pendingRevenue = invoices.filter(i => i.status === SUPERADMIN_INVOICE_STATUS_CODES.PENDING).reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const overdueCount = invoices.filter(i => i.status === SUPERADMIN_INVOICE_STATUS_CODES.OVERDUE).length;
    return { totalRevenue, failedRevenue, pendingRevenue, overdueCount };
}

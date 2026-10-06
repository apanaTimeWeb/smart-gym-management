// RESPONSIBILITY: Paginates the module-owned subscription invoice fixture and exposes canonical pagination metadata.
import type { Invoice } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';
import type { AdminSubscriptionsInvoicePaginationResult } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsInvoicePaginationTypes';

/**
 * paginateAdminSubscriptionsInvoices provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function paginateAdminSubscriptionsInvoices(invoices: Invoice[], page: number, limit: number): AdminSubscriptionsInvoicePaginationResult {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(invoices.length / safeLimit));
  const start = (safePage - 1) * safeLimit;
  return {
    items: invoices.slice(start, start + safeLimit),
    total: invoices.length,
    page: safePage,
    limit: safeLimit,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}

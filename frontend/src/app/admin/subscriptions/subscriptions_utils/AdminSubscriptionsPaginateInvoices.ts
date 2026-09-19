// RESPONSIBILITY: Paginates the module-owned subscription invoice fixture and exposes canonical pagination metadata.
import type { Invoice } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

export interface AdminSubscriptionsInvoicePaginationResult {
  items: Invoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

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

// RESPONSIBILITY: Defines pagination metadata for the Admin Subscriptions invoice list.
import type { Invoice } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';
export interface AdminSubscriptionsInvoicePaginationResult {
  items: Invoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}


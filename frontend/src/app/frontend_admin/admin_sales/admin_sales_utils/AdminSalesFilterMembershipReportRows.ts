// RESPONSIBILITY: Filters Sales membership-report rows using the same search semantics as the module mock handler.
import type { MembershipReportItem } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';

/**
 * filterAdminSalesMembershipReportRows provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function filterAdminSalesMembershipReportRows(rows: MembershipReportItem[], search: string): MembershipReportItem[] {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return rows;
  return rows.filter((row) => [row.plan, row.name, row.id].some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch)));
}

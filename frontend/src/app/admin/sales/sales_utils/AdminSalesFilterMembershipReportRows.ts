// RESPONSIBILITY: Filters Sales membership-report rows using the same search semantics as the module mock handler.
import type { MembershipReportItem } from '@/app/admin/sales/sales_types/AdminSalesTypes';

export function filterAdminSalesMembershipReportRows(rows: MembershipReportItem[], search: string): MembershipReportItem[] {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return rows;
  return rows.filter((row) => [row.plan, row.name, row.id].some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch)));
}

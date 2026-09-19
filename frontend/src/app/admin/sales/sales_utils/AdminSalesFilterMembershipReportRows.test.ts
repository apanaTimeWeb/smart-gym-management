import { describe, expect, it } from 'vitest';
import { filterAdminSalesMembershipReportRows } from '@/app/admin/sales/sales_utils/AdminSalesFilterMembershipReportRows';

describe('filterAdminSalesMembershipReportRows', () => {
  const rows = [
    { id: 1, plan: 'Growth', receivable: 1000, received: 800, remaining: 200, refund: 0 },
    { id: 2, plan: 'Starter', receivable: 500, received: 400, remaining: 100, refund: 0 },
  ];

  it('returns matching plan rows only', () => {
    expect(filterAdminSalesMembershipReportRows(rows, 'growth')).toHaveLength(1);
    expect(filterAdminSalesMembershipReportRows(rows, 'growth')[0]?.plan).toBe('Growth');
  });

  it('returns all rows for blank search', () => {
    expect(filterAdminSalesMembershipReportRows(rows, '   ')).toHaveLength(2);
  });
});

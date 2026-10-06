import { describe, expect, it } from 'vitest';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_utils/AdminDashboardFormatCurrency';

describe('AdminDashboardFormatCurrency', () => {
  it('uses the API-provided currency and correct ISO minor-unit precision', () => {
    expect(AdminDashboardFormatCurrency(123456, 'USD', 'en-US')).toContain('$1,234.56');
    expect(AdminDashboardFormatCurrency(123456, 'JPY', 'ja-JP')).toContain('￥123,456');
  });
});

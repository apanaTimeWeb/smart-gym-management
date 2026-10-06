import { describe, expect, it } from 'vitest';
import { AdminSalesWhatsAppFormatter } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesWhatsAppFormatter';

describe('AdminSalesWhatsAppFormatter', () => {
  it('builds a readable receipt from the payment reminder payload', () => {
    const result = AdminSalesWhatsAppFormatter.formatReceipt({
      title: 'Gym',
      subtitle: 'Payment Reminder',
      date: '29 Sep 2026',
      customerInfo: { Member: 'Test Member', Plan: 'Standard' },
      sections: [{ title: 'Outstanding Dues', items: { 'Pending Amount': '₹500', 'Overdue By': '3 days' } }],
      footer: 'Please clear dues.',
    });
    expect(result).toContain('Member: Test Member');
    expect(result).toContain('Pending Amount: ₹500');
    expect(result).toContain('Please clear dues.');
  });
});

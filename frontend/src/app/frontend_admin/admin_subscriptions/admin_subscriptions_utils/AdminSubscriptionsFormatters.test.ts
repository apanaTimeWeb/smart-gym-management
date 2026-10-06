import { describe, expect, it } from 'vitest';
import { formatDate } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatters';

describe('AdminSubscriptionsFormatters', () => {
  it('formats billing dates using the requested locale', () => {
    expect(formatDate('2026-01-05', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});

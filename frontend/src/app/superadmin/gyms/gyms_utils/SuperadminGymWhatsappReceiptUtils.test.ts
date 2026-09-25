import { describe, expect, it } from 'vitest';
import { formatSuperadminGymWhatsappReceiptDate } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymWhatsappReceiptUtils';

describe('formatSuperadminGymWhatsappReceiptDate', () => {
  it('formats a deterministic timestamp', () => {
    expect(formatSuperadminGymWhatsappReceiptDate(new Date('2026-09-20T12:00:00.000Z'), 'en-IN')).toMatch(/2026/);
  });
});

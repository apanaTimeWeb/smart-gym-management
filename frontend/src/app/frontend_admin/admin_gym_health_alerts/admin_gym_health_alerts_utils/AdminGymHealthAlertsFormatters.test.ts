import { describe, expect, it } from 'vitest';
import { formatDateTime } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_utils/AdminGymHealthAlertsFormatters';

describe('AdminGymHealthAlertsFormatters', () => {
  it('formats detected-at timestamps using the requested locale', () => {
    expect(formatDateTime('2026-01-05T13:04:05Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});

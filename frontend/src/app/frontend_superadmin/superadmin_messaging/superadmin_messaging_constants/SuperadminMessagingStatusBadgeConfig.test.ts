import { describe, expect, it } from 'vitest';

import { getSuperadminMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingStatusBadgeConfig';



describe('getSuperadminMessagingStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminMessagingStatusBadgeClasses('SENT')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminMessagingStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});

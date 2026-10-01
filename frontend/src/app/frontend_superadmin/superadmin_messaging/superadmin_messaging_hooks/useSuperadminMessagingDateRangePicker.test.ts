// DATA FLOW: API / URL state / module client state → useSuperadminMessagingDateRangePicker → superadmin_messaging view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminMessagingDateRangePicker } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingDateRangePicker';

describe('useSuperadminMessagingDateRangePicker', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingDateRangePicker).toBe('function');
  });
});

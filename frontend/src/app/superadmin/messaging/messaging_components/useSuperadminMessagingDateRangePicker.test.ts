import { describe, expect, it } from 'vitest';
import { useSuperadminMessagingDateRangePicker } from '@/app/superadmin/messaging/messaging_components/useSuperadminMessagingDateRangePicker.ts';

describe('useSuperadminMessagingDateRangePicker', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminMessagingDateRangePicker).toBe('function');
  });
});

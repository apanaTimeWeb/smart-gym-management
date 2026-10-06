import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminMessagingDateRangePicker } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingDateRangePicker';



describe('useSuperadminMessagingDateRangePicker', () => {
  it('emits normalized preset and custom date ranges', () => {
    const onRangeChange = vi.fn();
    const { result } = renderHook(() => useSuperadminMessagingDateRangePicker(onRangeChange));
    act(() => result.current.handleRangeChange('today'));
    expect(onRangeChange).toHaveBeenCalledTimes(1);
    expect(result.current.range).toBe('today');
    act(() => result.current.handleCustomStartChange('2026-10-01'));
    act(() => result.current.handleCustomEndChange('2026-10-05'));
    expect(onRangeChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-05');
  });
});

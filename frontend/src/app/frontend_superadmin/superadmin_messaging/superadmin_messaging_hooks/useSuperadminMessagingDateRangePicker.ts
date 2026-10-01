'use client';
// DATA FLOW: date-range controls → local selection state → pure date range utility → onRangeChange callback.
/**
 * Owns interaction state for DateRangePicker.
 * Inputs: parent `onRangeChange` callback. Output: selected option and custom dates plus normalized range handlers.
 * Side effects: invokes the callback when a complete range is selected; no server state is owned here.
 */
import { useState } from 'react';

import { getDateRange, serializeSuperadminCustomDateRange } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingDateRangeUtils';

import type { DateRangeOption } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingDateRangeTypes';

/** Owns date-range picker interaction state and emits normalized ranges to the parent feature view. */
/** Purpose: Owns the useSuperadminMessagingDateRangePicker data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies parent `onRangeChange` callback. Output: selected option and custom dates plus normalized range handlers.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminMessagingDateRangePicker(onRangeChange: (start: string, end: string) => void) {
  const [range, setRange] = useState<DateRangeOption>('this_month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  function handleRangeChange(value: string | number) {
    const next = String(value) as DateRangeOption;
    setRange(next);
    if (next !== 'custom' && next !== 'today' && next !== 'this_week' && next !== 'this_month' && next !== 'this_year') return;
    if (next === 'custom') return;
    const nextRange = getDateRange(next);
    onRangeChange(nextRange.start, nextRange.end);
  }

  function handleCustomStartChange(value: string) {
    setCustomStart(value);
    const nextRange = serializeSuperadminCustomDateRange(value, customEnd);
    onRangeChange(nextRange.start, nextRange.end);
  }

  function handleCustomEndChange(value: string) {
    setCustomEnd(value);
    const nextRange = serializeSuperadminCustomDateRange(customStart, value);
    onRangeChange(nextRange.start, nextRange.end);
  }

  return { range, customStart, customEnd, handleRangeChange, handleCustomStartChange, handleCustomEndChange };
}

// DATA FLOW: date-range controls → local selection state → pure date range utility → onRangeChange callback.
/**
 * Owns interaction state for SuperadminDateRangePicker.
 * Inputs: parent `onRangeChange` callback. Output: selected option and custom dates plus normalized range handlers.
 * Side effects: invokes the callback when a complete range is selected; no server state is owned here.
 */
'use client';
import { useState } from 'react';
import { getSuperadminDateRange, serializeSuperadminCustomDateRange } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateRangeUtils';
import type { SuperadminDateRangeOption } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateRangeConstants';

/** Owns date-range picker interaction state and emits normalized ranges to the parent feature view. */
export function useSuperadminDateRangePicker(onRangeChange: (start: string, end: string) => void) {
  const [range, setRange] = useState<SuperadminDateRangeOption>('this_month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  function handleRangeChange(value: string | number) {
    const next = String(value) as SuperadminDateRangeOption;
    setRange(next);
    if (next !== 'custom' && next !== 'today' && next !== 'this_week' && next !== 'this_month' && next !== 'this_year') return;
    if (next === 'custom') return;
    const nextRange = getSuperadminDateRange(next);
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

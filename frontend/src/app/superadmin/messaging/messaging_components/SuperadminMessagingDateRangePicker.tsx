// RESPONSIBILITY: Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility.
'use client';
import { Calendar } from 'lucide-react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingDateRangeConstants';
import { useSuperadminMessagingDateRangePicker } from '@/app/superadmin/messaging/messaging_components/useSuperadminMessagingDateRangePicker';
import type { SuperadminMessagingDateRangePickerProps } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingDateRangePickerTypes';



export default function SuperadminMessagingDateRangePicker({ onRangeChange }: SuperadminMessagingDateRangePickerProps) {
  const { range, customStart, customEnd, handleRangeChange, handleCustomStartChange, handleCustomEndChange } = useSuperadminMessagingDateRangePicker(onRangeChange);
  return (
    <div className="flex items-center gap-3 bg-page border border-border rounded-lg p-1.5 shadow-card">
      <div className="pl-2" aria-hidden="true"><Calendar size={18} strokeWidth={2} className="text-secondary" /></div>
      <div className="w-40 border-none">
        <SearchableDropdown options={SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: option.label }))} value={range} onChange={handleRangeChange} className="border-none bg-transparent !p-0" />
      </div>
      {range === 'custom' ? (
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <label className="sr-only" htmlFor="superadmin-date-range-custom-start">Start date</label>
          <input id="superadmin-date-range-custom-start" type="date" value={customStart} onChange={(event) => handleCustomStartChange(event.target.value)} className="bg-transparent text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
          <span className="text-secondary" aria-hidden="true">-</span>
          <label className="sr-only" htmlFor="superadmin-date-range-custom-end">End date</label>
          <input id="superadmin-date-range-custom-end" type="date" value={customEnd} onChange={(event) => handleCustomEndChange(event.target.value)} className="bg-transparent text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
        </div>
      ) : null}
    </div>
  );
}

export type { SuperadminMessagingDateRangePickerProps } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingDateRangePickerTypes';

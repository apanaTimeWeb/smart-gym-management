'use client';
// RESPONSIBILITY: Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility.
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingDateRangeConstants';
import { useSuperadminMessagingDateRangePicker } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingDateRangePicker';

import type { SuperadminMessagingDateRangePickerProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingDateRangePickerTypes';



/**
 * @description Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingDateRangePicker({ onRangeChange }: SuperadminMessagingDateRangePickerProps) {
  const t = useTranslations('superadmin_messaging');
  const { range, customStart, customEnd, handleRangeChange, handleCustomStartChange, handleCustomEndChange } = useSuperadminMessagingDateRangePicker(onRangeChange);
  return (
    <div className="flex items-center gap-3 bg-page border border-border rounded-lg p-1.5 shadow-card">
      <div className="pl-2" aria-hidden="true"><Calendar size={18} strokeWidth={2} className="text-secondary" data-testid="superadmin_messaging-superadmin-messaging-date-range-picker-date-range-picker-calendar"/></div>
      <div className="w-40 border-none">
        <SearchableDropdown data-testid="superadmin_messaging-superadmin-messaging-date-range-picker-range-picker-SearchableDropdown-26" options={SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={range} onChange={handleRangeChange} className="border-none bg-transparent !p-0" />
      </div>
      {range === 'custom' ? (
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <label className="sr-only" htmlFor="superadmin-date-range-custom-start">{t('ui.start_date_36dbb46')}</label>
          <input  id="superadmin-date-range-custom-start" type="date" value={customStart} onChange={(event) => handleCustomStartChange(event.target.value)} className="min-h-11 bg-input text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_messaging-superadmin-messaging-date-range-picker-range-picker-date-start"/>
          <span className="text-secondary" aria-hidden="true">{t('ui.text_336d5ebc')}</span>
          <label className="sr-only" htmlFor="superadmin-date-range-custom-end">{t('ui.end_date_d672350')}</label>
          <input  id="superadmin-date-range-custom-end" type="date" value={customEnd} onChange={(event) => handleCustomEndChange(event.target.value)} className="min-h-11 bg-input text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_messaging-superadmin-messaging-date-range-picker-range-picker-date-end"/>
        </div>
      ) : null}
    </div>
  );
}

export type { SuperadminMessagingDateRangePickerProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingDateRangePickerTypes';

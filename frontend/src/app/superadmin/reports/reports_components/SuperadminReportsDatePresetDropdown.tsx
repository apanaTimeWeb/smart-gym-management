// RESPONSIBILITY: Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent.
'use client';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { getSuperadminReportsPresetRange } from '@/app/superadmin/reports/reports_utils/SuperadminReportsDateRangeUtils';
import { SUPERADMIN_REPORTS_DATE_PRESET_OPTIONS } from '@/app/superadmin/reports/reports_utils/SuperadminReportsConstants';
import type { DatePreset, SuperadminReportsDatePresetDropdownProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsDatePresetDropdownTypes';

export function SuperadminReportsDatePresetDropdown({ value, onChange }: SuperadminReportsDatePresetDropdownProps) {
  const handlePresetChange = (presetValue: string) => {
    const preset = presetValue as DatePreset;
    const { from, to } = getSuperadminReportsPresetRange(preset);
    onChange(preset, from, to);
  };

  return (
    <div className="w-48 rounded-lg border border-border bg-input shadow-card">
      <SearchableDropdown
        options={SUPERADMIN_REPORTS_DATE_PRESET_OPTIONS as any}
        value={value}
        onChange={(nextValue) => handlePresetChange(String(nextValue))}
        className="border-transparent bg-transparent"
      />
    </div>
  );
}

export type { DatePreset } from '@/app/superadmin/reports/reports_types/SuperadminReportsDatePresetDropdownTypes';

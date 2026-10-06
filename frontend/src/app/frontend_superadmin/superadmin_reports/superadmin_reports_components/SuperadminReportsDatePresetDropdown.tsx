// RESPONSIBILITY: Renders/orchestrates SuperadminReportsDatePresetDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminReportsDatePresetDropdown owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_utils/SuperadminReportsDateRangeUtils, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent.
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_REPORTS_DATE_PRESET_OPTIONS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';
import { getSuperadminReportsPresetRange } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_utils/SuperadminReportsDateRangeUtils';

import type { DatePreset, SuperadminReportsDatePresetDropdownProps } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes';



/**
 * Responsibility: Renders the SuperadminReportsDatePresetDropdown UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminReportsDatePresetDropdown({ value, onChange }: SuperadminReportsDatePresetDropdownProps) {
  const handlePresetChange = (presetValue: string) => {
    const preset = presetValue as DatePreset;
    const { from, to } = getSuperadminReportsPresetRange(preset);
    onChange(preset, from, to);
  };

  return (
    <div className="w-48 rounded-lg border border-border bg-input shadow-card">
      <SearchableDropdown
        options={SUPERADMIN_REPORTS_DATE_PRESET_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
        data-testid="superadmin_reports-superadmin-reports-date-preset-dropdown-preset" value={value}
        onChange={(nextValue) => handlePresetChange(String(nextValue))}
        className="border-transparent bg-transparent"
      />
    </div>
  );
}

export type { DatePreset } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsDatePresetDropdownTypes';


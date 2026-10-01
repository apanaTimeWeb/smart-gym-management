// RESPONSIBILITY: Owns the static date-range choices exposed by Superadmin reporting/filter surfaces.
export const SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS = [
  { value: 'today', labelKey: 'ui.range_today' },
  { value: 'this_week', labelKey: 'ui.range_this_week' },
  { value: 'this_month', labelKey: 'ui.range_this_month' },
  { value: 'this_year', labelKey: 'ui.range_this_year' },
  { value: 'custom', labelKey: 'ui.range_custom' },
] as const;


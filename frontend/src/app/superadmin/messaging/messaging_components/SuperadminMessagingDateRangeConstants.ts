// RESPONSIBILITY: Owns the static date-range choices exposed by Superadmin reporting/filter surfaces.
export const SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom' },
] as const;

export type DateRangeOption = typeof SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS[number]['value'];

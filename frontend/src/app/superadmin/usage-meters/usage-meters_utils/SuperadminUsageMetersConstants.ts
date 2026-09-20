// RESPONSIBILITY: Centralized mock data constants for the Usage Meters Module.
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';

export const SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS = [
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
] as const;

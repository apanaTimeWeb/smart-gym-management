// RESPONSIBILITY: Types for selectable Superadmin report comparison datasets.
import type { SuperadminReportsV1Data } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types';

export interface SuperadminReportsV1ComparisonControlsProps {
  data: SuperadminReportsV1Data;
  period: string;
  segment: string;
  onPeriodChange: (value: string) => void;
  onSegmentChange: (value: string) => void;
}

export interface SuperadminReportsV1ComparisonMetric {
  name: string;
  current: number;
  previous: number;
  change: number;
}

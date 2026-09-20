// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ComparisonMemberSnapshot, ComparisonMetric } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import type { ApexOptions } from 'apexcharts';

export interface TrainerProgressComparisonChartProps {
  snapshots: ComparisonMemberSnapshot[];
  activeMetric: ComparisonMetric;
  onMetricChange: (m: ComparisonMetric) => void;
}

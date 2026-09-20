// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ProgressEntry, ProgressChartMetric } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

export interface TrainerProgressChartProps {
  entries: ProgressEntry[];
  activeMetric: ProgressChartMetric;
  onMetricChange: (m: ProgressChartMetric) => void;
}

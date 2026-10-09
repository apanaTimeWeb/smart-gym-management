// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressChartMetric } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingChartProps {
  entries: TrainerProgressTrackingProgressEntry[];
  activeMetric: TrainerProgressTrackingProgressChartMetric;
  onMetricChange: (m: TrainerProgressTrackingProgressChartMetric) => void;
}

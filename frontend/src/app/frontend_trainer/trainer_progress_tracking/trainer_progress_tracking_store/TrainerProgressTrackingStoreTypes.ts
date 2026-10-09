// RESPONSIBILITY: UI-only Zustand state contract for the Trainer Progress Tracking feature.
import type { TrainerProgressTrackingProgressChartMetric, TrainerProgressTrackingComparisonMetric } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingStore {
  activeMetric: TrainerProgressTrackingProgressChartMetric;
  setActiveMetric: (metric: TrainerProgressTrackingProgressChartMetric) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingEntryId: string | null;
  setEditingEntryId: (entryId: string | null) => void;
  activeComparisonMetric: TrainerProgressTrackingComparisonMetric;
  setActiveComparisonMetric: (metric: TrainerProgressTrackingComparisonMetric) => void;
  selectedComparisonIds: string[];
  toggleComparisonMember: (memberId: string) => void;
}

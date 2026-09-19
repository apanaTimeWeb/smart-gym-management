// RESPONSIBILITY: UI-only Zustand state contract for Trainer Progress Tracking.
import type { ProgressEntry, ProgressChartMetric, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export interface TrainerProgressStore {
  activeMetric: ProgressChartMetric;
  setActiveMetric: (metric: ProgressChartMetric) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingEntry: ProgressEntry | null;
  setEditingEntry: (entry: ProgressEntry | null) => void;
  activeComparisonMetric: ComparisonMetric;
  setActiveComparisonMetric: (metric: ComparisonMetric) => void;
  selectedComparisonIds: string[];
  toggleComparisonMember: (memberId: string) => void;
}

// RESPONSIBILITY: UI-only Zustand state contract for the Trainer Schedule feature.
import type { TrainerScheduleTab } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';

export interface TrainerScheduleStore {
  activeTab: TrainerScheduleTab;
  setActiveTab: (tab: TrainerScheduleTab) => void;
  showLeaveModal: boolean;
  setShowLeaveModal: (show: boolean) => void;
  openLeaveModal: () => void;
  closeLeaveModal: () => void;
}

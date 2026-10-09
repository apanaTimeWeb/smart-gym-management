// RESPONSIBILITY: UI-only Zustand state contract for the Trainer Schedule feature.
import type { TrainerScheduleTab } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_types/TrainerScheduleTypes';

export interface TrainerScheduleStore {
  activeTab: TrainerScheduleTab;
  setActiveTab: (tab: TrainerScheduleTab) => void;
  showLeaveModal: boolean;
  setShowLeaveModal: (show: boolean) => void;
  openLeaveModal: () => void;
  closeLeaveModal: () => void;
}

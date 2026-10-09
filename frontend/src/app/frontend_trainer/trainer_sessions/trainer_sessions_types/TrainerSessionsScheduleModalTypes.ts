// RESPONSIBILITY: Prop contract for the Trainer Sessions scheduling form.
import type { TrainerSessionsCreateSessionDto } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';

export interface TrainerSessionsScheduleMemberOption {
  value: string;
  label: string;
}

export interface TrainerSessionsScheduleModalProps {
  onClose: () => void;
  onSubmit: (dto: TrainerSessionsCreateSessionDto) => Promise<boolean>;
  memberOptions: TrainerSessionsScheduleMemberOption[];
  isSubmitting: boolean;
  testId?: string;
}

// RESPONSIBILITY: Prop contract for the Trainer Sessions scheduling form.
import type { CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export interface TrainerSessionsScheduleModalProps {
  onClose: () => void;
  onSubmit: (dto: CreateSessionDto) => Promise<void>;
  memberOptions: { value: string; label: string }[];
  isSubmitting: boolean;
}

// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export interface TrainerSessionsEditModalProps {
  session: TrainerSession; onClose: () => void; onSuccess: (updatedSession: TrainerSession, message: string) => void;
}

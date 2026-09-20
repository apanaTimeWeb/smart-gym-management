// RESPONSIBILITY: Owns the typed contract between the Sessions attendance modal and its mutation boundary.
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export interface TrainerSessionAttendanceModalProps {
  session: TrainerSession;
  onClose: () => void;
  onSubmit: (sessionId: string, attendedMemberIds: string[]) => Promise<void>;
}

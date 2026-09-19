// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

export interface TrainerSessionAttendanceModalProps {
  session: TrainerSession;
  onClose: () => void;
  onSubmit: (sessionId: string, attendedMemberIds: string[]) => Promise<void>;
}

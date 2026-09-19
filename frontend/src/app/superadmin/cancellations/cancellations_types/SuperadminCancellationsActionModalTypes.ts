// RESPONSIBILITY: Type contract extracted from SuperadminCancellationsActionModal.tsx; no business behavior.
import type { CancellationsAlert, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';

export interface SuperadminCancellationsActionModalProps {
    alert: CancellationsAlert;
    onConfirm: (payload: CancellationsActionPayload) => void;
    onClose: () => void;
}

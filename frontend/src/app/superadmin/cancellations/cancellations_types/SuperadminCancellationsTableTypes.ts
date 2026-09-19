// RESPONSIBILITY: Type contract extracted from SuperadminCancellationsTable.tsx; no business behavior.
import type { CancellationsAlert } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';

export interface SuperadminCancellationsTableProps {
    alerts: CancellationsAlert[];
    onActionClick: (alert: CancellationsAlert) => void;
}

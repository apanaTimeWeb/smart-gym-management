// RESPONSIBILITY: Form value contract for the Superadmin cancellation action modal.
import type { CancellationsActionStatus } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';

export interface SuperadminCancellationsActionFormValues {
  status: CancellationsActionStatus;
  notes: string;
}

// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { PtPackage, PtTrainerWorkload } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export interface ManagerPtAssignmentFormValues {
  memberId: string;
  packageId: string;
  trainerId: string;
  startDate: string;
  notes?: string;
}

export interface ManagerPtAssignmentFormProps {
  open: boolean;
  packages: PtPackage[];
  trainers: PtTrainerWorkload[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: ManagerPtAssignmentFormValues) => Promise<void>;
}

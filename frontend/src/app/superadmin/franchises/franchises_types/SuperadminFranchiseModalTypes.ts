// RESPONSIBILITY: Type contract extracted from SuperadminFranchiseModal.tsx; no business behavior.
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesTypes';
import type { FranchiseFormValues } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesSchemas';

export type FranchiseFormData = FranchiseFormValues;

export interface SuperadminFranchiseModalProps {
    isOpen: boolean;
    onClose: () => void;
    franchise: SuperadminFranchise;
    onSubmit: (data: FranchiseFormData) => void;
    isMutating: boolean;
}

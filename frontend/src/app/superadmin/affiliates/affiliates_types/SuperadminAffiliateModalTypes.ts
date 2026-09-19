// RESPONSIBILITY: Type contract extracted from SuperadminAffiliateModal.tsx; no business behavior.
import type { UseFormReturn } from 'react-hook-form';
import type { AffiliateFormData } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';

export interface SuperadminAffiliateModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<AffiliateFormData>;
    onSubmit: (data: AffiliateFormData) => void;
    isEdit?: boolean;
    isMutating?: boolean;
}

// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesAffiliateModal.tsx; no business behavior.
import type { AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
import type { UseFormReturn } from 'react-hook-form';

export interface SuperadminAffiliateModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<AffiliateFormData>;
    onSubmit: (data: AffiliateFormData) => void;
    isEdit?: boolean;
    isMutating?: boolean;
}

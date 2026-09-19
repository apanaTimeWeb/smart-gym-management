// RESPONSIBILITY: Type contract extracted from SuperadminBroadcastModal.tsx; no business behavior.
import type { UseFormReturn } from 'react-hook-form';
import type { BroadcastFormData } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';

export interface SuperadminBroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<BroadcastFormData>;
    onSubmit: (data: BroadcastFormData) => void;
    isEditMode?: boolean;
    isMutating?: boolean;
}

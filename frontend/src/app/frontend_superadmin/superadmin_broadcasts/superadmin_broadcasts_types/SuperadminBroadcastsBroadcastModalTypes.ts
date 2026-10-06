// RESPONSIBILITY: Type contract extracted from SuperadminBroadcastsBroadcastModal.tsx; no business behavior.
import type { BroadcastFormData } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';
import type { UseFormReturn } from 'react-hook-form';



export interface SuperadminBroadcastsBroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<BroadcastFormData>;
    onSubmit: (data: BroadcastFormData) => void;
    isEditMode?: boolean;
    isMutating?: boolean;
}

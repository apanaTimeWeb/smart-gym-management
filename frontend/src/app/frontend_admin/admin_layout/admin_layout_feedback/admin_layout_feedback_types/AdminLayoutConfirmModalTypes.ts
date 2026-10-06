// RESPONSIBILITY: Defines props for the reusable Admin confirmation modal.
import type { AdminConfirmType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutConfirmTypes';
export interface AdminConfirmModalProps {
  isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void; confirmText?: string; cancelText?: string; type?: AdminConfirmType; requireTyping?: boolean; confirmationPhrase?: string;
}

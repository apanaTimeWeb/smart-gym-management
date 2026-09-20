// RESPONSIBILITY: Defines props for the reusable Admin confirmation modal.
import type { AdminConfirmType } from '@/app/admin/admin_layout/AdminFeedback/AdminConfirmTypes';
export interface AdminConfirmModalProps {
  isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void; confirmText?: string; cancelText?: string; type?: AdminConfirmType; requireTyping?: boolean; confirmationPhrase?: string;
}

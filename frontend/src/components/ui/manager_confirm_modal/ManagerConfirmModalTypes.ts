// RESPONSIBILITY: Type definitions for the owning Manager UI component.
export type ManagerConfirmType = 'danger' | 'warning' | 'info';


export interface ManagerConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: ManagerConfirmType;
}

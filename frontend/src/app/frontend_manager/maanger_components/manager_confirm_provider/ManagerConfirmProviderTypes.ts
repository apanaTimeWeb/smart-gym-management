// RESPONSIBILITY: Type contracts for the Manager confirmation context infrastructure.
import type { ManagerConfirmType } from '@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes';

export interface ManagerConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ManagerConfirmType;
}

export interface ManagerConfirmContextType {
  confirm: (options: ManagerConfirmOptions) => Promise<boolean>;
}

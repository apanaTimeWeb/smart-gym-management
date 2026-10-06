// RESPONSIBILITY: Defines the reusable confirmation-dialog contract for Admin actions.
export type AdminConfirmType = 'danger' | 'warning' | 'info';
export interface AdminConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: AdminConfirmType;
  requireTyping?: boolean;
  confirmationPhrase?: string;
}
export interface AdminConfirmContextType {
  confirm: (options: AdminConfirmOptions) => Promise<boolean>;
}

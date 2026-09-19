// RESPONSIBILITY: Defines the shared confirmation-dialog options and context contract for Superadmin UI state only.
export type SuperadminConfirmType = 'danger' | 'warning' | 'info';
export interface SuperadminConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: SuperadminConfirmType;
}
export interface SuperadminConfirmContextValue {
    confirm: (options: SuperadminConfirmOptions) => Promise<boolean>;
}

export interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: SuperadminConfirmType;
}

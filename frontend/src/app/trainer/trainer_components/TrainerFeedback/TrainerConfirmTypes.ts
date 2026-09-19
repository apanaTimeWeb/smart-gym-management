// RESPONSIBILITY: Type contracts for Trainer-wide confirmation UI and the programmatic confirm() API.
export const TRAINER_CONFIRM_TYPES = ['danger', 'warning', 'info'] as const;
export type TrainerConfirmType = (typeof TRAINER_CONFIRM_TYPES)[number];

export interface TrainerConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: TrainerConfirmType;
  requireTypedConfirmation?: boolean;
  confirmationPhrase?: string;
}

export interface TrainerConfirmContextValue {
  confirm: (options: TrainerConfirmOptions) => Promise<boolean>;
}

export interface TrainerConfirmModalProps extends TrainerConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

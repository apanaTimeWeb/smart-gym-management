import type { RefObject } from 'react';

export interface ManagerDialogFocusTrapOptions {
  dialogRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

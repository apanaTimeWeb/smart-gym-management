// RESPONSIBILITY: Type definitions for the owning Manager UI component.

export type ManagerToastAriaLive = 'polite' | 'assertive';
export type ManagerToastType = 'error' | 'success' | 'warning' | 'info';

export interface ManagerToastProps {
 message: string;
 type: ManagerToastType;
 onClose: () => void;
}

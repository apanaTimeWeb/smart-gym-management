// RESPONSIBILITY: Defines the Admin toast presentation contract shared by the Admin toast store, provider, and adapters.
export type AdminToastType = 'whatsapp' | 'email' | 'error' | 'success' | 'info' | 'warning';

export interface AdminToastProps {
  id?: string;
  message: string;
  type: AdminToastType;
  onClose: () => void;
}

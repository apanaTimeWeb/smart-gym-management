import type { ReactNode } from 'react';
export interface AdminLayoutProps {
  children: ReactNode;
  /** Optional zero-business shell slot supplied by the host application for role-owned context controls. */
  headerContextSlot?: ReactNode;
}

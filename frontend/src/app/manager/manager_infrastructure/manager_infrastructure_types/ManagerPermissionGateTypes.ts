// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ReactNode } from 'react';

export interface ManagerPermissionGateProps {
  capability: string;
  children: ReactNode;
}

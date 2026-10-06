import { SUPERADMIN_LAYOUT_ERROR_BOUNDARY_VARIANTS, SUPERADMIN_LAYOUT_THEMES } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_constants/SuperadminLayoutConstants';

import type { ReactNode } from 'react';


export interface SuperadminLayoutErrorBoundaryProps {
  children: ReactNode;
  variant?: (typeof SUPERADMIN_LAYOUT_ERROR_BOUNDARY_VARIANTS)[number];
}

export interface SuperadminLayoutErrorBoundaryState {
  hasError: boolean;
}

export interface SuperadminLayoutErrorBoundaryCopy {
  title: string;
  retry: string;
}


export type SuperadminTheme = typeof SUPERADMIN_LAYOUT_THEMES[number];

export interface SuperadminThemeContextValue {
  theme: SuperadminTheme;
}

export interface SuperadminSocketEnvelope {
  event: string;
  payload: unknown;
}

export type SuperadminSocketHandler = (payload: unknown) => void;

export interface SuperadminSocketContextValue {
  subscribe: (event: string, handler: SuperadminSocketHandler) => () => void;
  connected: boolean;
}

export interface SuperadminLayoutRoleProvidersProps {
  children: ReactNode;
}

export interface SuperadminLayoutThemeProviderProps {
  children: ReactNode;
}

export interface SuperadminLayoutSocketProviderProps {
  children: ReactNode;
}

export interface SuperadminNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * RESPONSIBILITY: Defines typed Login error-boundary props and state for safe route/client recovery UI.
 * DATA FLOW: Next.js or React error -> typed boundary state/props -> safe Login fallback UI.
 */
import type { ReactNode } from 'react';

export interface LoginRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface LoginErrorBoundaryProps {
  children: ReactNode;
}

export interface LoginErrorBoundaryState {
  hasError: boolean;
}

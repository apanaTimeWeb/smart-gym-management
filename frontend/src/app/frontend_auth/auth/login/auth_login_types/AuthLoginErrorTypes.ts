/**
 * RESPONSIBILITY: Defines typed Login route/client error contracts for safe recovery UI.
 * DATA FLOW: Next.js/React error -> typed Login boundary state/props -> safe translated fallback.
 */
import type { ReactNode } from 'react';

export interface AuthLoginRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface AuthLoginErrorBoundaryProps {
  children: ReactNode;
}

export interface AuthLoginErrorBoundaryState {
  hasError: boolean;
}

export interface AuthLoginErrorBoundaryFallbackProps {
  onRetry: () => void;
}

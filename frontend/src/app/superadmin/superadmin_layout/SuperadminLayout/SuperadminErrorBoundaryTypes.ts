// RESPONSIBILITY: Type contract extracted from SuperadminErrorBoundary.tsx; no business behavior.
import type React from 'react';

export type SuperadminErrorBoundaryVariant = 'full' | 'inline';

export interface SuperadminErrorBoundaryProps {
    children: React.ReactNode;
    variant?: SuperadminErrorBoundaryVariant;
}

export interface SuperadminErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorId?: string;
}

export type ErrorBoundaryState = SuperadminErrorBoundaryState;

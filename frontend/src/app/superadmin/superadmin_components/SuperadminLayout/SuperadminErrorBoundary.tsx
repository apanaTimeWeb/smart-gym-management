// RESPONSIBILITY: SuperadminErrorBoundary.tsx acts as the typed React Error Boundary for the Superadmin module.
'use client';
import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { logger } from '@/lib/logger';
interface ErrorBoundaryProps {
    children: React.ReactNode;
    variant?: 'full' | 'inline';
}
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorId?: string;
}
export class SuperadminErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        return { hasError: true, error, errorId };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error(error, { route: window.location.pathname, module: 'superadmin', errorId: this.state.errorId, componentStack: errorInfo.componentStack });
    }
    resetErrorBoundary = () => {
        this.setState({ hasError: false, error: undefined, errorId: undefined });
    };
    render() {
        if (this.state.hasError) {
            const isInline = this.props.variant === 'inline';
            if (isInline) {
                return (<div className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl text-center w-full h-full min-h-32">
            <AlertTriangle className="w-5 h-5 text-danger mb-2"/>
            <h3 className="text-sm font-semibold text-foreground">Section Error</h3>
            <button onClick={this.resetErrorBoundary} className="mt-2 text-xs text-primary hover:underline">
              Retry
            </button>
          </div>);
            }
            return (<div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl">
          <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-danger"/>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">A system error occurred</h2>
          <p className="text-secondary text-sm max-w-md text-center mb-2">
            An unexpected error occurred while rendering this module. Please try again or contact infrastructure.
          </p>
          <p className="text-xs text-secondary/70 mb-6 bg-overlay px-3 py-1.5 rounded border border-border font-mono">
            Error ID: {this.state.errorId}
          </p>
          <button onClick={this.resetErrorBoundary} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-lg">
            <RefreshCcw className="w-4 h-4"/>
            Try Again
          </button>
        </div>);
        }
        return this.props.children;
    }
}

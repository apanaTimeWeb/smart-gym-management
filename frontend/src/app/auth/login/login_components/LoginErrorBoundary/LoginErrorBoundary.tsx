'use client';
/**
 * RESPONSIBILITY: Catches Login client-component render failures and exposes a user-safe retry action.
 * DATA FLOW: Render failure -> boundary state -> module-specific fallback -> local re-render retry.
 */
import { Component } from 'react';
import type { ErrorInfo } from 'react';
import { logger } from '@/lib/logger';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';
import type { LoginErrorBoundaryProps, LoginErrorBoundaryState } from '@/app/auth/login/login_types/LoginErrorTypes';

export default class LoginErrorBoundary extends Component<LoginErrorBoundaryProps, LoginErrorBoundaryState> {
  public state: LoginErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): LoginErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Auth login component error', error, errorInfo);
  }

  public render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center shadow-card" role="alert">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg text-danger text-3xl font-bold" aria-hidden="true">!</div>
        <h2 className="mb-2 text-xl font-bold text-primary">{LoginSharedConstants.TEXT.ERROR_TITLE}</h2>
        <p className="mb-6 max-w-sm text-sm text-secondary">{LoginSharedConstants.TEXT.ERROR_DESCRIPTION}</p>
        <button
          type="button"
          onClick={() => this.setState({ hasError: false })}
          className="min-h-11 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {LoginSharedConstants.TEXT.ERROR_RETRY}
        </button>
      </div>
    );
  }
}

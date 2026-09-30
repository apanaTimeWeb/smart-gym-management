// RESPONSIBILITY: Captures client render errors inside Login and renders the module-owned retry fallback.
'use client';
import { Component } from 'react';
import { logger } from '@/lib/logger';
import AuthLoginErrorBoundaryFallback from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginErrorBoundary/AuthLoginErrorBoundaryFallback';
import type { AuthLoginErrorBoundaryProps, AuthLoginErrorBoundaryState } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginErrorTypes';
import type { ErrorInfo } from 'react';
/**
 * Catches Login client-component render failures and exposes a user-safe retry action.
 * @description Isolates client render failures so the Login route can recover without exposing technical details.
 * @dependencies React Component, centralized logger, and AuthLoginErrorBoundaryFallback.
 * @edge-case Retry clears only this boundary's error state and does not mutate an authentication session.
 */
export default class AuthLoginErrorBoundary extends Component<AuthLoginErrorBoundaryProps, AuthLoginErrorBoundaryState> {
  public state: AuthLoginErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): AuthLoginErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Auth login component error', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  public render() {
    if (!this.state.hasError) return this.props.children;
    return <AuthLoginErrorBoundaryFallback onRetry={this.handleRetry} />;
  }
}

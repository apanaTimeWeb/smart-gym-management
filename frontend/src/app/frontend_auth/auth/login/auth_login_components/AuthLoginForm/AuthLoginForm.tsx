// RESPONSIBILITY: Renders the interactive Login form view only; form state, validation, mutation orchestration, and navigation are delegated to useAuthLoginForm.
'use client';
import { ArrowRight, ChevronLeft, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { useAuthLoginForm } from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginForm/useAuthLoginForm';
import { AuthLoginSharedConstants } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';
/**
 * Renders the interactive Login form view using the module-local translation namespace and hook-owned state.
 * @description All auth mutation and navigation behavior stays outside the JSX view.
 * @dependencies useAuthLoginForm, AuthUrlConfig, AuthLoginSharedConstants, and next-intl.
 * @edge-case Development demo controls are gated at render time and never expose token material.
 */
export default function AuthLoginForm() {
  const t = useTranslations('AUTH_LOGIN');
  const {
    form,
    isSubmitting,
    isDemoLoginAvailable,
    isOffline,
    pendingDemoRole,
    showPassword,
    handleLoginSubmit,
    handleDemoLogin,
    handleTogglePassword,
  } = useAuthLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const formError = errors.root?.message;

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      <Link
        href={AuthUrlConfig.PAGES.LANDING}
        data-testid="auth-login-form-back-to-home"
        className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-md text-sm text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label={t('BACK_TO_HOME_ARIA')}
      >
        <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
        {t('BACK_TO_HOME')}
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="mb-1 h-16 w-16 overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <Image
            src={AuthLoginSharedConstants.ASSETS.LOGO}
            alt={t('BRAND')}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="text-page-title font-bold text-primary">{t('FORM_TITLE')}</h1>
        <p className="text-sm text-secondary">{t('FORM_SUBTITLE')}</p>
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-card p-8 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <form data-testid="auth-login-form" onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5" noValidate>
          {isOffline && (
            <div
              data-testid="auth-login-form-offline"
              className="rounded-md border border-border bg-warning-bg p-3 text-sm text-warning"
              role="status"
              aria-live="polite"
            >
              {t('OFFLINE')}
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-sm font-semibold text-secondary">
              {t('FORM_EMAIL_LABEL')}
            </label>
            <div className="relative">
              <Mail size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="login-email"
                data-testid="auth-login-form-email"
                type="email"
                autoComplete="email"
                {...register('email')}
                disabled={isSubmitting}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-4 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out hover:border-focus focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={t('FORM_EMAIL_PLACEHOLDER')}
              />
            </div>
            {errors.email && (
              <p id="login-email-error" data-testid="auth-login-form-email-error" className="text-xs text-danger" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="block text-sm font-semibold text-secondary">
              {t('FORM_PASSWORD_LABEL')}
            </label>
            <div className="relative">
              <Lock size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="login-password"
                data-testid="auth-login-form-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                disabled={isSubmitting}
                required
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-12 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out hover:border-focus focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={t('FORM_PASSWORD_PLACEHOLDER')}
              />
              <button
                type="button"
                data-testid="auth-login-form-password-toggle"
                aria-label={showPassword ? t('HIDE_PASSWORD') : t('SHOW_PASSWORD')}
                aria-pressed={showPassword}
                disabled={isSubmitting}
                onClick={handleTogglePassword}
                className="absolute right-1 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2} aria-hidden="true" /> : <Eye size={18} strokeWidth={2} aria-hidden="true" />}
              </button>
            </div>
            {errors.password && (
              <p id="login-password-error" data-testid="auth-login-form-password-error" className="text-xs text-danger" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {formError && (
            <div
              data-testid="auth-login-form-error"
              className="rounded-md border border-border bg-danger-bg p-3 text-sm text-danger"
              role="alert"
              aria-live="polite"
            >
              {formError}
            </div>
          )}

          <button
            type="submit"
            data-testid="auth-login-form-submit"
            disabled={isSubmitting || isOffline}
            aria-busy={isSubmitting}
            className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:animate-spin" />
                <span>{t('FORM_SUBMITTING')}</span>
              </>
            ) : (
              <>
                <span>{t('FORM_SUBMIT')}</span>
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-base ease-in-out motion-safe:group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {isDemoLoginAvailable && (
            <>
              <div className="flex items-center gap-4 py-2">
                <div className="h-0 flex-1 border-t border-border" />
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{t('QUICK_DEMOS')}</span>
                <div className="h-0 flex-1 border-t border-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {AuthLoginSharedConstants.DEMO_BUTTONS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    data-testid={`auth-login-form-demo-${demo.role.toLowerCase()}`}
                    disabled={isSubmitting || isOffline}
                    aria-busy={pendingDemoRole === demo.role}
                    onClick={() => void handleDemoLogin(demo.role)}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-subtle motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pendingDemoRole === demo.role ? (
                      <>
                        <Loader2 size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:animate-spin" />
                        <span>{t('DEMO_LOADING')}</span>
                      </>
                    ) : (
                      t(demo.labelKey)
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </form>
      </div>

      <p className="text-center text-xs text-disabled">{t('FOOTER')}</p>
    </div>
  );
}

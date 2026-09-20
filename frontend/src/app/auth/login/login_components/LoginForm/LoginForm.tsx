'use client';
/**
 * RESPONSIBILITY: Renders the Login view only. Form state, validation, mutation lifecycle, and navigation are delegated to useLoginForm.
 * DATA FLOW: UI events -> useLoginForm -> AuthApi -> Auth session route -> user-visible validation/error state or server-side redirect.
 */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useLoginForm } from '@/app/auth/login/login_components/LoginForm/useLoginForm';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

const isDemoLoginVisible = process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_AUTH_DEMO_MODE === 'true';

export default function LoginForm() {
  const { form, isSubmitting, showPassword, setShowPassword, onSubmit, handleDemoLogin } = useLoginForm();
  const { register, handleSubmit, formState: { errors } } = form;
  const formError = errors.root?.message;

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      <Link
        href={AuthUrlConfig.PAGES.LANDING}
        className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm text-secondary motion-safe:transition-colors motion-safe:duration-base ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label={LoginSharedConstants.TEXT.BACK_TO_HOME_ARIA}
      >
        <ChevronLeft size={18} aria-hidden="true" />
        {LoginSharedConstants.TEXT.BACK_TO_HOME}
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="mb-1 h-16 w-16 overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <Image
            src={LoginSharedConstants.ASSETS.LOGO}
            alt={LoginSharedConstants.TEXT.BRAND}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-primary">{LoginSharedConstants.TEXT.FORM_TITLE}</h1>
        <p className="text-sm text-secondary">{LoginSharedConstants.TEXT.FORM_SUBTITLE}</p>
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-card p-8 shadow-card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-sm font-semibold text-secondary">
              {LoginSharedConstants.TEXT.FORM_EMAIL_LABEL}
            </label>
            <div className="relative">
              <Mail size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                {...register('email')}
                disabled={isSubmitting}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-4 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={LoginSharedConstants.TEXT.FORM_EMAIL_PLACEHOLDER}
              />
            </div>
            {errors.email && <p id="login-email-error" className="text-xs text-danger" role="alert">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="block text-sm font-semibold text-secondary">
              {LoginSharedConstants.TEXT.FORM_PASSWORD_LABEL}
            </label>
            <div className="relative">
              <Lock size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                disabled={isSubmitting}
                required
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-12 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={LoginSharedConstants.TEXT.FORM_PASSWORD_PLACEHOLDER}
              />
              <button
                type="button"
                aria-label={showPassword ? LoginSharedConstants.TEXT.HIDE_PASSWORD : LoginSharedConstants.TEXT.SHOW_PASSWORD}
                aria-pressed={showPassword}
                disabled={isSubmitting}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-secondary motion-safe:transition-colors motion-safe:duration-base ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            {errors.password && <p id="login-password-error" className="text-xs text-danger" role="alert">{errors.password.message}</p>}
          </div>

          {formError && (
            <div className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-primary" role="alert" aria-live="polite">
              {formError}
            </div>
          )}

          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} aria-hidden="true" className="motion-safe:animate-spin" />
                <span>{LoginSharedConstants.TEXT.FORM_SUBMITTING}</span>
              </>
            ) : (
              <>
                <span>{LoginSharedConstants.TEXT.FORM_SUBMIT}</span>
                <ArrowRight size={18} aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-base ease-in-out group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {isDemoLoginVisible && (
            <>
              <div className="flex items-center gap-4 py-2">
                <div className="h-0 flex-1 border-t border-border" />
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{LoginSharedConstants.TEXT.QUICK_DEMOS}</span>
                <div className="h-0 flex-1 border-t border-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {LoginSharedConstants.DEMO_BUTTONS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => void handleDemoLogin(demo.role)}
                    className="min-h-11 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-subtle motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {LoginSharedConstants.TEXT[demo.labelKey]}
                  </button>
                ))}
              </div>
            </>
          )}
        </form>
      </div>

      <p className="text-center text-xs text-disabled">{LoginSharedConstants.TEXT.FOOTER}</p>
    </div>
  );
}

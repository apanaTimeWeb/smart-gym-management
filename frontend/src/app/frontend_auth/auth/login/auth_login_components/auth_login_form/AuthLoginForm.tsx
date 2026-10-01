// RESPONSIBILITY: Orchestrates the Login form view; field rendering and action controls are isolated into child components while state remains hook-owned.
'use client';

import { useTranslations } from 'next-intl';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import AuthLoginCredentialFields from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_credential_fields/AuthLoginCredentialFields';

import AuthLoginDemoActions from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_demo_actions/AuthLoginDemoActions';

import AuthLoginFormError from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_form_error/AuthLoginFormError';

import AuthLoginFormFooter from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_form_footer/AuthLoginFormFooter';

import AuthLoginFormHeaderSection from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_form_header_section/AuthLoginFormHeaderSection';

import AuthLoginSubmitButton from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_submit_button/AuthLoginSubmitButton';

import { AuthLoginConstants } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants';

import { useAuthLoginForm } from '@/app/frontend_auth/auth/login/auth_login_hooks/useAuthLoginForm';



/**
 * Renders the complete Login form surface using hook-owned state and module-local child views.
 * @description The component is intentionally a view/orchestration layer; validation, mutation, idempotency, connectivity, and navigation remain in hooks/API code.
 * @dependencies useAuthLoginForm, Login child views, AuthLoginConstants, and AuthUrlConfig.
 * @edge-case Offline state disables all authentication actions without fabricating a local success state.
 */
export default function AuthLoginForm() {
  const t = useTranslations('AUTH_LOGIN');
  const state = useAuthLoginForm();
  const { form } = state;
  const formError = form.formState.errors.root?.message;
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <AuthLoginFormHeaderSection
        backToHomeLabel={t('BACK_TO_HOME')}
        backToHomeAriaLabel={t('BACK_TO_HOME_ARIA')}
        landingRoute={AuthUrlConfig.PAGES.LANDING}
        brand={t('BRAND')}
        logoSource={AuthLoginConstants.ASSETS.LOGO}
        title={t('FORM_TITLE')}
        subtitle={t('FORM_SUBTITLE')}
      />

      <div className="space-y-5 rounded-lg border border-border bg-card p-8 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <form data-testid="auth_login-form-root" aria-describedby={formError ? 'login-form-error' : undefined} onSubmit={form.handleSubmit(state.handleLoginSubmit)} className="space-y-5" noValidate>
          {state.isOffline && <div data-testid="auth_login-form-offline" className="rounded-md border border-border bg-warning-bg p-3 text-sm text-warning" role="status" aria-live="polite">{t('OFFLINE')}</div>}
          <AuthLoginCredentialFields form={form} isSubmitting={state.isSubmitting} showPassword={state.showPassword} onTogglePassword={state.handleTogglePassword} />
          <AuthLoginFormError message={formError} />
          <div className="flex justify-end"><AuthLoginSubmitButton isSubmitting={state.isSubmitting} isDisabled={state.isSubmitting || state.isOffline} label={t('FORM_SUBMIT')} submittingLabel={t('FORM_SUBMITTING')} /></div>
          <AuthLoginDemoActions isSubmitting={state.isSubmitting} isOffline={state.isOffline} isDemoLoginAvailable={state.isDemoLoginAvailable} pendingDemoRole={state.pendingDemoRole} onDemoLogin={(role) => state.handleDemoLogin(role)} quickDemosLabel={t('QUICK_DEMOS')} loadingLabel={t('DEMO_LOADING')} />
        </form>
      </div>
      <AuthLoginFormFooter label={t('FOOTER')} />
    </div>
  );
}

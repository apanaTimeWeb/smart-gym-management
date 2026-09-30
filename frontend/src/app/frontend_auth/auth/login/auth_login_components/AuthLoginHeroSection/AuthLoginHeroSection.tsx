// RESPONSIBILITY: Renders static desktop Login branding and product context; contains no authentication state or API behavior.
'use client';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AuthLoginSharedConstants } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';
/**
 * Renders the desktop Login branding and product-context presentation.
 * @description Uses only semantic theme tokens and module-local translated copy.
 * @dependencies next/image, next-intl, AuthLoginSharedConstants.
 * @edge-case Hidden below the desktop breakpoint; AuthLoginMobileHeader supplies mobile branding.
 */
export default function AuthLoginHeroSection() {
  const t = useTranslations('AUTH_LOGIN');

  return (
    <section className="relative hidden min-h-screen w-3/5 overflow-hidden bg-sidebar p-12 lg:flex lg:flex-col lg:justify-between">
      <div aria-hidden="true" className="absolute inset-0 bg-sidebar" />
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={AuthLoginSharedConstants.ASSETS.HERO_IMAGE}
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="relative flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-md border border-border bg-card shadow-card">
          <Image src={AuthLoginSharedConstants.ASSETS.LOGO} alt={t('BRAND')} width={44} height={44} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xl font-bold leading-none text-primary">{t('BRAND')}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-secondary">{t('BRAND_TAGLINE')}</p>
        </div>
      </div>

      <div className="relative space-y-8">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-primary">
            {t('TITLE')}
            <br />
            <span className="text-primary">{t('SUBTITLE')}</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">{t('HERO_DESCRIPTION')}</p>
        </div>

        <ul className="space-y-3">
          {AuthLoginSharedConstants.HERO_FEATURE_KEYS.map((featureKey) => (
            <li key={featureKey} className="flex items-center gap-3">
              <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-success" />
              <span className="text-sm text-secondary">{t(featureKey)}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-3">
          {AuthLoginSharedConstants.HERO_STATS.map((stat, index) => {
            const Icon = AuthLoginSharedConstants.HERO_ICONS[index % AuthLoginSharedConstants.HERO_ICONS.length] ?? TrendingUp;
            return (
              <div key={stat.labelKey} className="rounded-lg border border-border bg-card p-4 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <Icon size={18} strokeWidth={2} aria-hidden="true" className="text-primary" />
                <p className="mt-3 text-kpi font-bold leading-none text-primary">{stat.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-secondary">{t(stat.labelKey)}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div data-testid="auth-login-hero-status-secure" className="relative inline-flex w-fit items-center gap-2 rounded-full border border-border bg-success-bg px-4 py-2">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success motion-safe:animate-pulse" />
        <span className="text-xs font-semibold text-success">{t('SECURE_BADGE')}</span>
      </div>
    </section>
  );
}

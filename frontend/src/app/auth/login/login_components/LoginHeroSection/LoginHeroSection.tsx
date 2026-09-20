/**
 * RESPONSIBILITY: Renders static desktop Login branding and product context with global semantic theme tokens only.
 * DATA FLOW: LoginSharedConstants -> presentational hero; no auth state, API calls, or business mutations.
 */
import Image from 'next/image';
import { CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';

const HERO_ICONS = [TrendingUp, Users, Zap];

export default function LoginHeroSection() {
  return (
    <section className="relative hidden min-h-screen w-3/5 overflow-hidden bg-sidebar p-12 lg:flex lg:flex-col lg:justify-between">
      <div aria-hidden="true" className="absolute inset-0 bg-sidebar" />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <Image src={LoginSharedConstants.ASSETS.HERO_IMAGE} alt="" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-md border border-border bg-card shadow-card">
          <Image src={LoginSharedConstants.ASSETS.LOGO} alt={LoginSharedConstants.TEXT.BRAND} width={44} height={44} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xl font-bold leading-none text-primary">{LoginSharedConstants.TEXT.BRAND}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-secondary">{LoginSharedConstants.TEXT.BRAND_TAGLINE}</p>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-primary">
            {LoginSharedConstants.TEXT.TITLE}
            <br />
            <span className="text-primary">{LoginSharedConstants.TEXT.SUBTITLE}</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">{LoginSharedConstants.TEXT.HERO_DESCRIPTION}</p>
        </div>

        <ul className="space-y-3">
          {LoginSharedConstants.HERO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-success" />
              <span className="text-sm text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-3">
          {LoginSharedConstants.HERO_STATS.map((stat, index) => {
            const Icon = HERO_ICONS[index % HERO_ICONS.length] ?? TrendingUp;
            return (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-4 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
                <Icon size={18} aria-hidden="true" className="text-primary" />
                <p className="mt-3 text-2xl font-bold leading-none text-primary">{stat.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-secondary">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-success bg-success-bg px-4 py-2">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success motion-safe:animate-pulse" />
        <span className="text-xs font-semibold text-success">{LoginSharedConstants.TEXT.SECURE_BADGE}</span>
      </div>
    </section>
  );
}

'use client';
/**
 * RESPONSIBILITY: React component SuperadminLayoutSaaSBillingNavigation owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: usePathname, useRouter
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_constants/SuperadminLayoutSaaSBillingNavigationConstants, next/navigation
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin SaaS Billing sub-navigation and performs client-side route transitions only.
import { usePathname, useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_constants/SuperadminLayoutSaaSBillingNavigationConstants';



export default function SuperadminSaaSBillingNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('SuperadminLayoutStyles');

  return (
    <nav aria-label={t('navigation.saaS_billing_sections')} className="flex w-full flex-wrap overflow-x-auto border-b border-border">
      {SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS.map(({ nameKey, href, icon: Icon, routeMatch }) => {
        const active = pathname?.includes(routeMatch) ?? false;
        return (
          <button
            key={nameKey}
            type="button"
            onClick={() => router.push(href)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}
           data-testid={`SuperadminLayoutStyles-saas-billing-navigation-${nameKey}` }>
            <Icon size={18} aria-hidden="true" />
            {t(`navigation.${nameKey}`)}
          </button>
        );
      })}
    </nav>
  );
}


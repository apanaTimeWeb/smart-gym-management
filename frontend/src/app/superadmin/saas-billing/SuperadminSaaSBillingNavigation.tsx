// RESPONSIBILITY: Renders the Superadmin SaaS Billing sub-navigation and performs client-side route transitions only.
'use client';

import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/superadmin/saas-billing/saas-billing_utils/SuperadminSaaSBillingNavigationConstants';
import { usePathname, useRouter } from 'next/navigation';

export default function SuperadminSaaSBillingNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label="SaaS billing sections" className="flex w-full flex-wrap overflow-x-auto border-b border-border">
      {SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS.map(({ name, href, icon: Icon, routeMatch }) => {
        const active = pathname?.includes(routeMatch) ?? false;
        return (
          <button
            key={name}
            type="button"
            onClick={() => router.push(href)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-primary text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}
          >
            <Icon size={18} aria-hidden="true" />
            {name}
          </button>
        );
      })}
    </nav>
  );
}

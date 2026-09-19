'use client';
import { usePathname, useRouter } from 'next/navigation';
import { CreditCard, Receipt, Tag } from 'lucide-react';
import { PlansUrlConfig } from '@/app/superadmin/saas-billing/plans/superadmin_plans_url_config';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import { CouponsUrlConfig } from '@/app/superadmin/saas-billing/coupons/superadmin_coupons_url_config';

export default function SaaSBillingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: 'Subscriptions & Tiers',
      href: PlansUrlConfig.PAGES.MAIN,
      icon: CreditCard,
      active: pathname?.includes('/plans')
    },
    {
      name: 'Tenant Invoices',
      href: InvoicesUrlConfig.PAGES.MAIN,
      icon: Receipt,
      active: pathname?.includes('/invoices')
    },
    {
      name: 'Platform Coupons',
      href: CouponsUrlConfig.PAGES.MAIN,
      icon: Tag,
      active: pathname?.includes('/coupons')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-primary">SaaS Billing & Revenue</h1>
        <p className="text-secondary">Manage platform subscription plans, view tenant invoices, and configure promotional coupons.</p>
      </div>

      <div className="flex w-full overflow-x-auto border-b border-border hide-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-surface-hover ${
                item.active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-secondary hover:text-primary hover:border-border'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

// RESPONSIBILITY: Provides the server-rendered SaaS Billing section shell without owning client navigation state.
import type { ReactNode } from 'react';
import SuperadminSaaSBillingNavigation from '@/app/superadmin/saas-billing/SuperadminSaaSBillingNavigation';

export default function SaaSBillingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-primary">SaaS Billing &amp; Revenue</h1>
        <p className="text-secondary">Manage platform subscription plans, view tenant invoices, and configure promotional coupons.</p>
      </div>
      <SuperadminSaaSBillingNavigation />
      <div className="mt-4">{children}</div>
    </div>
  );
}

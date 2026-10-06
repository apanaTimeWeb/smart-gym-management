"use client";
// RESPONSIBILITY: Tab switcher for Payouts module (Summary vs P&L Statement).
import { useTranslations } from 'next-intl';

import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';
import { PAYOUT_TAB_OPTIONS } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';



/**
 * AdminPayoutsTabs renders the admin payouts tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsTabs: Tab switcher for Payouts module (Summary vs P&L Statement).
 * @dependencies Consumes useAdminPayoutsLogic, AdminPayoutsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsTabs() {
  const t = useTranslations();
  const { activeTab, setActiveTab } = useAdminPayoutsLogic();
  return (
    <div className="flex gap-1 bg-input rounded-xl p-1 w-fit">
      {PAYOUT_TAB_OPTIONS.map((tab, __testIdIndex22) => (
        <button type="button"
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all ${activeTab === tab.id ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`}
         data-testid={`admin_payouts-admin_payouts-tabs-click-map22-${__testIdIndex22}-1`}>
          {t(tab.labelKey)}
        </button>
      ))}
    </div>
  );
}
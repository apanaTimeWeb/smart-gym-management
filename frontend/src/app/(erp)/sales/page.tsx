"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import { SalesProvider, useSalesContext } from './sales_context/SalesContext';
import SalesToolbar from './sales_components/SalesToolbar/SalesToolbar';
import SalesTabs from './sales_components/SalesTabs/SalesTabs';
import SalesOverview from './sales_components/SalesOverview/SalesOverview';
import MembershipReport from './sales_components/MembershipReport/MembershipReport';
import PendingPayments from './sales_components/PendingPayments/PendingPayments';
import AllMemberships from './sales_components/AllMemberships/AllMemberships';

import './sales.css';

function SalesContent() {
  const { tab } = useSalesContext();

  return (
    <div className="min-h-full pb-10 sales-module bg-[var(--bg-page)] text-[var(--sales-text-primary)]">
      <ErpHeader title="Sales & Reports" subtitle="Monitor membership revenue, track payments and analyze performance" />
      <div className="p-6 space-y-5">
        <SalesToolbar />

        <div className="bg-[var(--sales-bg-card)] rounded-xl shadow-sm border border-[var(--sales-border)] overflow-hidden">
          <SalesTabs />

          <div className="p-5">
            {tab === 'Overview' && <SalesOverview />}
            {tab === 'Membership Report' && <MembershipReport />}
            {tab === 'Pending Payments' && <PendingPayments />}
            {tab === 'All Memberships' && <AllMemberships />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SalesPage() {
  return (
    <SalesProvider>
      <SalesContent />
    </SalesProvider>
  );
}

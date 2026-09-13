// RESPONSIBILITY: KPI cards for the Subscriptions module.
'use client';

import { CreditCard, IndianRupee, FileText, Calendar, TrendingDown, Zap } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminSubscriptionsKPIs() {
  const { kpis } = useAdminSubscriptionsLogic();
  const dateSuffix = useDateRangeSuffix();
  if (!kpis) return null;

  const fmt = (v: number) => `₹${v.toLocaleString('en-IN')}`;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      <AdminStatCard title={`Current Plan${dateSuffix}`} value={kpis.currentPlan} icon={Zap} iconBg="rgba(250,204,21,0.15)" iconColor="var(--primary)" />
      <AdminStatCard title={`Monthly Spend${dateSuffix}`} value={fmt(kpis.monthlySpend)} icon={IndianRupee} iconBg="rgba(34,197,94,0.15)" iconColor="var(--success)" />
      <AdminStatCard title={`Total Invoices${dateSuffix}`} value={kpis.totalInvoices} change="all time" changeType="neutral" icon={FileText} iconBg="rgba(99,102,241,0.15)" iconColor="var(--info)" />
      <AdminStatCard title={`Next Billing${dateSuffix}`} value={fmt(kpis.nextBillingAmount)} icon={CreditCard} iconBg="rgba(250,204,21,0.15)" iconColor="var(--primary)" />
      <AdminStatCard title={`Days to Renewal${dateSuffix}`} value={kpis.daysUntilRenewal} change="days remaining" changeType="neutral" icon={Calendar} iconBg="rgba(245,158,11,0.15)" iconColor="var(--warning)" />
      <AdminStatCard title={`Save with Annual${dateSuffix}`} value={fmt(kpis.savedWithAnnual)} change="vs monthly billing" changeType="up" icon={TrendingDown} iconBg="rgba(34,197,94,0.15)" iconColor="var(--success)" />
    </div>
  );
}

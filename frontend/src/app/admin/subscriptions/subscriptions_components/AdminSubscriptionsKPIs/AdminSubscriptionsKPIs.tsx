"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: KPI cards for the Subscriptions module.

import { CreditCard, IndianRupee, FileText, Calendar, TrendingDown, Zap } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminSubscriptionsKPIs() {
  const { kpis } = useAdminSubscriptionsLogic();
  const dateSuffix = useDateRangeSuffix();
  if (!kpis) return null;

  const fmt = (v: number) => formatCurrency(v);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      <AdminStatCard title={`Current Plan${dateSuffix}`} value={kpis.currentPlan} icon={Zap} iconBg="bg-primary/10" iconColor="text-primary" />
      <AdminStatCard title={`Monthly Spend${dateSuffix}`} value={fmt(kpis.monthlySpend)} icon={IndianRupee} iconBg="bg-success/10" iconColor="text-success" />
      <AdminStatCard title={`Total Invoices${dateSuffix}`} value={kpis.totalInvoices} change="all time" changeType="neutral" icon={FileText} iconBg="bg-info/10" iconColor="text-info" />
      <AdminStatCard title={`Next Billing${dateSuffix}`} value={fmt(kpis.nextBillingAmount)} icon={CreditCard} iconBg="bg-primary/10" iconColor="text-primary" />
      <AdminStatCard title={`Days to Renewal${dateSuffix}`} value={kpis.daysUntilRenewal} change="days remaining" changeType="neutral" icon={Calendar} iconBg="bg-warning/10" iconColor="text-warning" />
      <AdminStatCard title={`Save with Annual${dateSuffix}`} value={fmt(kpis.savedWithAnnual)} change="vs monthly billing" changeType="up" icon={TrendingDown} iconBg="bg-success/10" iconColor="text-success" />
    </div>
  );
}

"use client";
// RESPONSIBILITY: KPI cards for the Payouts module.

import { TrendingUp, IndianRupee, TrendingDown, Clock } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminPayoutsLogic } from '@/app/admin/payouts/payouts_context/useAdminPayoutsLogic';
import { formatCurrency } from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminPayoutsKPIs() {
  const { kpis } = useAdminPayoutsLogic();
  const dateSuffix = useDateRangeSuffix();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard title={`Net Profit${dateSuffix}`} value={formatCurrency(kpis.totalNetProfit)} change="after all deductions" changeType="up" icon={TrendingUp} iconBg="bg-success/10" iconColor="text-success" />
      <AdminStatCard title={`Gross Revenue${dateSuffix}`} value={formatCurrency(kpis.totalGrossRevenue)} change="all gyms combined" changeType="neutral" icon={IndianRupee} iconBg="bg-primary/10" iconColor="text-primary" />
      <AdminStatCard title={`Total Expenses${dateSuffix}`} value={formatCurrency(kpis.totalExpenses)} change="payroll + ops" changeType="down" icon={TrendingDown} iconBg="bg-danger/10" iconColor="text-danger" />
      <AdminStatCard title={`Pending Payouts${dateSuffix}`} value={kpis.pendingPayouts} change="awaiting transfer" changeType="neutral" icon={Clock} iconBg="bg-warning/10" iconColor="text-warning" />
    </div>
  );
}
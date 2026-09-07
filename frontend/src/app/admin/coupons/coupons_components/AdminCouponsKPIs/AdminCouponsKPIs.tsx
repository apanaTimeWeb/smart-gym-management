// RESPONSIBILITY: Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost.
'use client';

import { Tag, CheckCircle, BarChart2, TrendingDown } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { MOCK_COUPONS_KPI, formatCurrency } from '@/app/admin/coupons/coupons_utils/AdminCouponsSharedConstants';

export default function AdminCouponsKPIs() {
  const kpi = MOCK_COUPONS_KPI;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard title="Total Coupons" value={kpi.totalCoupons} icon={Tag} iconBg="rgba(250,204,21,0.15)" iconColor="var(--primary)" />
      <AdminStatCard title="Active Coupons" value={kpi.activeCoupons} change="currently live" changeType="up" icon={CheckCircle} iconBg="rgba(34,197,94,0.15)" iconColor="var(--success)" />
      <AdminStatCard title="Total Redeemed" value={kpi.totalRedeemed.toLocaleString('en-IN')} change="all time" changeType="neutral" icon={BarChart2} iconBg="rgba(59,130,246,0.15)" iconColor="var(--info)" />
      <AdminStatCard title="Revenue Lost" value={formatCurrency(kpi.revenueLost)} change="to discounts" changeType="down" icon={TrendingDown} iconBg="rgba(239,68,68,0.15)" iconColor="var(--danger)" />
    </div>
  );
}

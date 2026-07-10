"use client";

import { useDashboardContext } from '@/app/(erp)/dashboard/dashboard_context/DashboardContext';
import ErpStatCard from '@/app/(erp)/erp_components/ErpShared/ErpStatCard';
import { Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, UserCheck, ShoppingCart } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function DashboardKPIs() {
 const { stats } = useDashboardContext();
 if (!stats) return null;
 const s = stats;

 return (
 <>
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
 <ErpStatCard 
 title="Total Members" 
 value={s.totalMembers.toLocaleString()} 
 change="All time" 
 changeType="up" 
 icon={Users} 
 iconBg="dashboard-icon-info-bg" 
 iconColor="dashboard-icon-info-text" 
 />
 <ErpStatCard 
 title="Monthly Revenue" 
 value={fmt(s.monthlyRevenue)} 
 change="This month" 
 changeType="up" 
 icon={DollarSign} 
 iconBg="dashboard-icon-success-bg" 
 iconColor="dashboard-icon-success-text" 
 />
 <ErpStatCard 
 title="Active Members" 
 value={s.activeMembers.toLocaleString()} 
 change={`${s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0}% of total`} 
 changeType="neutral" 
 icon={UserCheck} 
 iconBg="dashboard-icon-warning-bg" 
 iconColor="dashboard-icon-warning-text" 
 />
 <ErpStatCard 
 title="Pending Payments" 
 value={fmt(s.pendingPayments)} 
 change={`${s.membersByStatus?.pending || 0} members`} 
 changeType="down" 
 icon={AlertCircle} 
 iconBg="dashboard-icon-danger-bg" 
 iconColor="dashboard-icon-danger-text" 
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
 <ErpStatCard 
 title="New Members (Month)" 
 value={s.newMembersThisMonth.toLocaleString()} 
 change="This month" 
 changeType="up" 
 icon={TrendingUp} 
 iconBg="dashboard-icon-purple-bg" 
 iconColor="dashboard-icon-purple-text" 
 />
 <ErpStatCard 
 title="Total Staff" 
 value={s.activeStaff.toLocaleString()} 
 change="Active staff" 
 changeType="neutral" 
 icon={Clock} 
 iconBg="dashboard-icon-warning-bg" 
 iconColor="dashboard-icon-warning-text" 
 />
 <ErpStatCard 
 title="Store Products" 
 value={s.totalProducts.toLocaleString()} 
 change={s.lowStockCount > 0 ? `${s.lowStockCount} low stock` : 'All stocked'} 
 changeType={s.lowStockCount > 0 ? 'down' : 'up'} 
 icon={ShoppingCart} 
 iconBg="dashboard-icon-info-bg" 
 iconColor="dashboard-icon-info-text" 
 />
 <ErpStatCard 
 title="New Inquiries" 
 value={s.newInquiries.toLocaleString()} 
 change={`${s.totalInquiries} total`} 
 changeType="up" 
 icon={CheckCircle} 
 iconBg="dashboard-icon-success-bg" 
 iconColor="dashboard-icon-success-text" 
 />
 </div>
 </>
 );
}

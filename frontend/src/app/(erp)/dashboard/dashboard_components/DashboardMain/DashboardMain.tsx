"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpLayout/ErpHeader';
import { DashboardProvider, useDashboardContext } from '@/app/(erp)/dashboard/dashboard_context/DashboardContext';
import DashboardKPIs from '@/app/(erp)/dashboard/dashboard_components/DashboardKPIs/DashboardKPIs';
import RecentMembers from '@/app/(erp)/dashboard/dashboard_components/RecentMembers/RecentMembers';
import PendingPayments from '@/app/(erp)/dashboard/dashboard_components/PendingPayments/PendingPayments';
import PromoCard from '@/app/(erp)/dashboard/dashboard_components/PromoCard/PromoCard';
import MembershipDistribution from '@/app/(erp)/dashboard/dashboard_components/MembershipDistribution/MembershipDistribution';
import '@/app/(erp)/dashboard/dashboard.css';

function DashboardContent() {
 const { loading, error } = useDashboardContext();

 if (loading) return (
 <div className="min-h-full flex items-center justify-center">
 <div className="text-center">
 <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
 <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading dashboard...</p>
 </div>
 </div>
 );

 if (error) return (
 <div className="min-h-full flex items-center justify-center">
 <div className="text-center">
 <p className="font-medium" style={{ color: 'var(--danger)' }}>Failed to load dashboard</p>
 <p className="text-sm mt-1" style={{ color: 'var(--danger)' }}>{error}</p>
 </div>
 </div>
 );

 return (
 <>
 <ErpHeader title="Dashboard" subtitle="Welcome back, Admin! Here's your gym overview." />
 <div className="p-6 space-y-6">
 <DashboardKPIs />
 <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
 <RecentMembers />
 <div className="space-y-4">
 <PendingPayments />
 <PromoCard />
 </div>
 </div>
 <MembershipDistribution />
 </div>
 </>
 );
}

export default function DashboardMain() {
 return (
 <DashboardProvider>
 <div className="min-h-full dashboard-module">
 <DashboardContent />
 </div>
 </DashboardProvider>
 );
}

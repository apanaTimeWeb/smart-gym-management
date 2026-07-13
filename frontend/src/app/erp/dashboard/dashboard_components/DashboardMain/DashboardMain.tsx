// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import { DashboardProvider, useDashboardContext } from '@/app/erp/dashboard/dashboard_context/DashboardContext';
import { DashboardStats } from '@/app/erp/dashboard/dashboard_types/dashboard_types';
import DashboardKPIs from '@/app/erp/dashboard/dashboard_components/DashboardKPIs/DashboardKPIs';
import RecentMembers from '@/app/erp/dashboard/dashboard_components/RecentMembers/RecentMembers';
import PendingPayments from '@/app/erp/dashboard/dashboard_components/PendingPayments/PendingPayments';
import PromoCard from '@/app/erp/dashboard/dashboard_components/PromoCard/PromoCard';
import MembershipDistribution from '@/app/erp/dashboard/dashboard_components/MembershipDistribution/MembershipDistribution';
import { Loader2 } from 'lucide-react';

function DashboardContent() {
 const { status, error } = useDashboardContext();

  if (status === 'loading') return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-3" />
        <p className="text-sm text-secondary">Loading dashboard...</p>
      </div>
    </div>
  );

 if (status === 'error') return (
 <div className="min-h-full flex items-center justify-center">
 <div className="text-center">
 <p className="font-medium text-danger">Failed to load dashboard</p>
 <p className="text-sm mt-1 text-danger">{error}</p>
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

export default function DashboardMain({ initialData }: { initialData?: DashboardStats | null }) {
  return (
    <DashboardProvider initialData={initialData}>
      <div className="min-h-full">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}

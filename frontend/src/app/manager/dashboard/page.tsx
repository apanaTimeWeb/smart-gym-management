import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
// RESPONSIBILITY: Server Component that fetches initial SSR data for the dashboard layout.
import ManagerDashboardMain from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMain/ManagerDashboardMain';
import { cookies } from 'next/headers';
import type { DashboardStats } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';
import type { ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/manager/Manager_url_config';
import { ssrDashboardApi } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardServerApi';

async function getDashboardData() {
  try {
    const res = await ssrDashboardApi.getStats();
    return res.data || null;
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
 const initialData = await getDashboardData();
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerDashboardMain initialData={initialData} />
    </Suspense>
  );
}

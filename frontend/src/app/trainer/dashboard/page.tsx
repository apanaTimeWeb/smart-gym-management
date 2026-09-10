// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Server Component that fetches initial SSR data for the dashboard layout.
import TrainerDashboardMain from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMain/TrainerDashboardMain';
import { cookies } from 'next/headers';
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';
import type { ApiResponse } from '@/lib/api';

async function getDashboardData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gymsmart_token')?.value;
    
    if (!token) return null;
    
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const allowedHosts = ['localhost', '127.0.0.1'];
    const parsedUrl = new URL(backendUrl);
    if (!allowedHosts.includes(parsedUrl.hostname) && !parsedUrl.hostname.endsWith('.gymsmart.com')) {
      return null;
    }
    const res = await fetch(`${parsedUrl.origin}/trainer/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!res.ok) return null;
    const json = await res.json() as ApiResponse<DashboardStats>;
    return json.data || null;
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
 const initialData = await getDashboardData();
 return <TrainerDashboardMain initialData={initialData} />;
}


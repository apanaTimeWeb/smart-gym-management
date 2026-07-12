import DashboardMain from '@/app/erp/dashboard/dashboard_components/DashboardMain/DashboardMain';
import { cookies } from 'next/headers';

async function getDashboardData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gymsmart_token')?.value;
    
    if (!token) return null;
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const res = await fetch(`${backendUrl}/erp/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
 const initialData = await getDashboardData();
 return <DashboardMain initialData={initialData} />;
}

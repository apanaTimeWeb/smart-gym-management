// RESPONSIBILITY: Server component entry point for the Admin Staff Performance Dashboard.
import AdminHrPerformanceMain from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformanceMain';

export const metadata = {
  title: 'Staff Performance | Smart Gym 360',
};

export default function AdminHrPerformancePage() {
  // In a real app, Server-side auth check goes here.
  return <AdminHrPerformanceMain />;
}

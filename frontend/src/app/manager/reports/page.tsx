// RESPONSIBILITY: Server Component — entry point for the Reports module.
import type { Metadata } from 'next';
import ManagerReportsMain from '@/app/manager/reports/reports_components/ManagerReportsMain/ManagerReportsMain';

export const metadata: Metadata = {
  title: 'Reports | Manager — GymSmart',
  description: 'Revenue, attendance, member churn, and expense analytics with CSV export.',
};

export default function ManagerReportsPage() {
  return <ManagerReportsMain />;
}

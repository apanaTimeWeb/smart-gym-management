// RESPONSIBILITY: Server Component entry point for /manager/support. Rule 8 compliant.
import type { Metadata } from 'next';
import ManagerSupportMain from '@/app/manager/support/support_components/ManagerSupportMain/ManagerSupportMain';

export const metadata: Metadata = { title: 'Help & Support | Manager | GymSmart' };

export default function ManagerSupportPage() {
  return <ManagerSupportMain />;
}

// RESPONSIBILITY: Server Component entry point for /superadmin/branches.
import type { Metadata } from 'next';
import SuperadminBranchesClient from '@/app/superadmin/branches/branches_components/SuperadminBranchesClient';

export const metadata: Metadata = {
  title: 'Branches | Superadmin | GymSmart',
};

export default function SuperadminBranchesPage() {
  return <SuperadminBranchesClient />;
}

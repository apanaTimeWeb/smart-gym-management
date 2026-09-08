// RESPONSIBILITY: Pure Server Component entry point for /superadmin/profile.
import type { Metadata } from 'next';
import SuperadminProfileMain from '@/app/superadmin/profile/profile_components/SuperadminProfileMain/SuperadminProfileMain';

export const metadata: Metadata = {
  title: 'My Profile | Superadmin | GymSmart',
  description: 'Manage your superadmin account settings and security.',
};

export default function SuperadminProfilePage() {
  return <SuperadminProfileMain />;
}

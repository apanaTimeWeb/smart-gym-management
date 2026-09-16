import { Suspense } from 'react';
// RESPONSIBILITY: Server component page for Admin Members. Passes no initial data (client-side fetch via hook).
import AdminMembersMain from '@/app/admin/members/members_components/AdminMembersMain/AdminMembersMain';

export const metadata = { title: 'Members — Admin | Smart Gym 360' };

export default function AdminMembersPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminMembersMain />
    </Suspense>
  );
}

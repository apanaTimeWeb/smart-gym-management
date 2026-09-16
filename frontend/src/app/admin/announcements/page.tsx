import { Suspense } from 'react';
// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import AdminAnnouncementsMain from '@/app/admin/announcements/announcements_components/AdminAnnouncementsMain/AdminAnnouncementsMain';

export const metadata: Metadata = {
  title: 'Announcements | Admin - GymSmart',
  description: 'Broadcast notices and announcements to members, staff, and trainers.',
};

export default function AdminAnnouncementsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminAnnouncementsMain />
    </Suspense>
  );
}

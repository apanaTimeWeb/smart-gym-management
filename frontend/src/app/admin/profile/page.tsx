import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /admin/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import AdminProfileMain from '@/app/admin/profile/profile_components/AdminProfileMain/AdminProfileMain';

export const metadata: Metadata = { title: 'My Profile | Admin | GymSmart' };

export default function AdminProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminProfileMain />
    </Suspense>
  );
}
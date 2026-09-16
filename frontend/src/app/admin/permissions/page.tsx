import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Permissions page.
import AdminPermissionsMain from '@/app/admin/permissions/permissions_components/AdminPermissionsMain/AdminPermissionsMain';

export default function PermissionsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminPermissionsMain />
    </Suspense>
  );
}

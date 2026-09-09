'use client';
// RESPONSIBILITY: Error boundary for Admin Members page. Handles 403 permission-denied separately from generic errors.
import AdminErrorFallback from '@/app/admin/admin_components/AdminShared/AdminErrorFallback';

export default function AdminMembersError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <AdminErrorFallback error={error} reset={reset} moduleName="Members" />;
}

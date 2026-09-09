'use client';
// RESPONSIBILITY: Error boundary for Admin Coupons page. Handles 403 permission-denied separately from generic errors.
import AdminErrorFallback from '@/app/admin/admin_components/AdminShared/AdminErrorFallback';

export default function CouponsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <AdminErrorFallback error={error} reset={reset} moduleName="Coupons" />;
}

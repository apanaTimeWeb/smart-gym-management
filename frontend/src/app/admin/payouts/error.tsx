'use client';
// RESPONSIBILITY: Error boundary for Admin Payouts page. Handles 403 permission-denied separately from generic errors.
import AdminErrorFallback from '@/app/admin/admin_components/AdminShared/AdminErrorFallback';

export default function PayoutsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <AdminErrorFallback error={error} reset={reset} moduleName="Payouts" />;
}

import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the invoices page. Renders the interactive client component.
import SuperadminInvoicesClient from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminInvoicesClient />
    </Suspense>
  );
}

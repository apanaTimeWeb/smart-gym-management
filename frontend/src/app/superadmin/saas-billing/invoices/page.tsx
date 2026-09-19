import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the invoices page. Renders the interactive client component.
import SuperadminInvoicesClient from '@/app/superadmin/saas-billing/invoices/invoices_components/SuperadminInvoicesClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminInvoicesClient />
    </Suspense>);
}

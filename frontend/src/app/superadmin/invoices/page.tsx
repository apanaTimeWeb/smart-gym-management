import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the invoices page. Renders the interactive client component.
import SuperadminInvoicesClient from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesClient';
import SuperadminInvoicesV1Client from '@/app/superadmin/invoices/invoices_components/SuperadminInvoicesV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminInvoicesClient />
      <SuperadminInvoicesV1Client />
    </Suspense>);
}

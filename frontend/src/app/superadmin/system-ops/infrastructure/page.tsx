// RESPONSIBILITY: Pure Server Component for the infrastructure page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminInfrastructureClient from '@/app/superadmin/system-ops/infrastructure/infrastructure_components/SuperadminInfrastructureClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminInfrastructureClient />
    </Suspense>);
}

import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the infrastructure page. Renders the interactive client component.
import SuperadminInfrastructureClient from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureClient';
import SuperadminInfrastructureV1Client from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminInfrastructureClient />
      <SuperadminInfrastructureV1Client />
    </Suspense>);
}

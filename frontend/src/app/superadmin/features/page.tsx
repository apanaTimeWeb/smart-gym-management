import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the features page. Renders the interactive client component.
import SuperadminFeaturesClient from '@/app/superadmin/features/features_components/SuperadminFeaturesClient';
import SuperadminFeaturesV1Client from '@/app/superadmin/features/features_components/SuperadminFeaturesV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminFeaturesClient />
      <SuperadminFeaturesV1Client />
    </Suspense>);
}

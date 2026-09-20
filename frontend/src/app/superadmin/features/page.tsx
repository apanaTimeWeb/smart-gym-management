// RESPONSIBILITY: Pure Server Component for the features page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminFeaturesClient from '@/app/superadmin/features/features_components/SuperadminFeaturesClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminFeaturesClient />
    </Suspense>);
}

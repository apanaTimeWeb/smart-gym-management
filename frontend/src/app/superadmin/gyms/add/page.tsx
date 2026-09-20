// RESPONSIBILITY: Server Component that acts as the entry point for the Add Gym page.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminAddGymForm from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/SuperadminAddGymForm';
export default function AddGymPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAddGymForm />
    </Suspense>);
}

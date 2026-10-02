// RESPONSIBILITY: Server entry for the Superadmin gym detail route; passes the route gym ID to client views.
import { notFound } from 'next/navigation';

import SuperadminGymsGymDetailView from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailView';

import type { SuperadminGymDetailPageProps } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymDetailPageTypes';


export default async function GymDetailPage({ params }: SuperadminGymDetailPageProps) {
    const { id } = await params;
    if (!id)
        return notFound();
    return (<>
      <SuperadminGymsGymDetailView gymId={id}/>
    </>);
}

// RESPONSIBILITY: Server entry for the Superadmin gym detail route; passes the route gym ID to client views.
import SuperadminGymDetailClient from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient';
import { notFound } from 'next/navigation';
import type { SuperadminGymDetailPageProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailPageTypes';
export default async function GymDetailPage({ params }: SuperadminGymDetailPageProps) {
    const { id } = await params;
    if (!id)
        return notFound();
    return (<>
      <SuperadminGymDetailClient gymId={id}/>
    </>);
}

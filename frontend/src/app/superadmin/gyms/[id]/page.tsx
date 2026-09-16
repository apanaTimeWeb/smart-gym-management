import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry for /superadmin/gyms/[id] — fetches gym detail server-side.
// DATA FLOW: page.tsx (Server) → SuperadminGymDetailClient (Client)

import { notFound } from 'next/navigation';
import SuperadminGymDetailClient from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient';

interface GymDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GymDetailPage({ params }: GymDetailPageProps) {
  const { id } = await params;
  if (!id) return notFound();
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminGymDetailClient gymId={id} />
    </Suspense>
  );
}

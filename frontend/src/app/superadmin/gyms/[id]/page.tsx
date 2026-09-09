'use client';
// RESPONSIBILITY: Server Component entry for /superadmin/gyms/[id] — fetches gym detail server-side.
// DATA FLOW: page.tsx (Server) → SuperadminGymDetailClient (Client)

import { notFound } from 'next/navigation';
import SuperadminGymDetailClient from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient';

interface GymDetailPageProps {
  params: { id: string };
}

export default async function GymDetailPage({ params }: GymDetailPageProps) {
  const { id } = params;
  if (!id) return notFound();
  return <SuperadminGymDetailClient gymId={id} />;
}

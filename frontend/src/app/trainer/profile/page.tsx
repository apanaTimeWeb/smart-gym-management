import { Suspense } from 'react';
import TrainerProfileLoadingSkeleton from '@/app/trainer/profile/profile_components/TrainerProfileLoadingSkeleton/TrainerProfileLoadingSkeleton';
// RESPONSIBILITY: Server Component entry point for /trainer/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import TrainerProfileMain from '@/app/trainer/profile/profile_components/TrainerProfileMain/TrainerProfileMain';

export const metadata: Metadata = { title: 'My Profile | Trainer | GymSmart' };

export default function TrainerProfilePage() {
  return (
    <Suspense fallback={<TrainerProfileLoadingSkeleton />}>
      <TrainerProfileMain />
    </Suspense>
  );
}

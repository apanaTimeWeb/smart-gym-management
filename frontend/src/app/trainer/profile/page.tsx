import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /trainer/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import TrainerProfileMain from '@/app/trainer/profile/profile_components/TrainerProfileMain/TrainerProfileMain';

export const metadata: Metadata = { title: 'My Profile | Trainer | GymSmart' };

export default function TrainerProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerProfileMain />
    </Suspense>
  );
}

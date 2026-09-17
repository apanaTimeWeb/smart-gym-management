import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /trainer/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import TrainerProfileMain from '@/app/trainer/profile/profile_components/TrainerProfileMain/TrainerProfileMain';

export const metadata: Metadata = { title: 'My Profile | Trainer | GymSmart' };

export default function TrainerProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerProfileMain />
    </Suspense>
  );
}

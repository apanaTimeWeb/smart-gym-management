// RESPONSIBILITY: Server route entry that renders the Library client boundary without duplicating client query requests.
import { Suspense } from 'react';

import TrainerLibraryLoadingSkeleton from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_loading_skeleton/TrainerLibraryLoadingSkeleton';

import TrainerLibraryMain from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_main/TrainerLibraryMain';





/**
 * @description Provides the server-owned Next.js route entry point for the library feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryPage() {
  return (
    <Suspense fallback={<TrainerLibraryLoadingSkeleton />}>
      <TrainerLibraryMain />
    </Suspense>
  );
}

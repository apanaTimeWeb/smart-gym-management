import { Suspense } from 'react';
import TrainerLibraryLoadingSkeleton from '@/app/trainer/library/library_components/TrainerLibraryLoadingSkeleton/TrainerLibraryLoadingSkeleton';
// RESPONSIBILITY: Server route entry that renders the Library client boundary without duplicating client query requests.
import TrainerLibraryMain from '@/app/trainer/library/library_components/TrainerLibraryMain/TrainerLibraryMain';

export default function LibraryPage() {
  return (
    <Suspense fallback={<TrainerLibraryLoadingSkeleton />}>
      <TrainerLibraryMain />
    </Suspense>
  );
}

import { Suspense } from 'react';
// RESPONSIBILITY: Server route entry that renders the Library client boundary without duplicating client query requests.
import TrainerLibraryMain from '@/app/trainer/library/library_components/TrainerLibraryMain/TrainerLibraryMain';

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading library…</div>}>
      <TrainerLibraryMain />
    </Suspense>
  );
}

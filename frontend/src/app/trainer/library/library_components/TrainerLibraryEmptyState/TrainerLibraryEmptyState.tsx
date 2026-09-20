// RESPONSIBILITY: Displays an empty-state explanation for the Trainer Diet Library.
import { Apple } from 'lucide-react';
import type { TrainerLibraryEmptyStateProps } from '@/app/trainer/library/library_types/TrainerLibraryEmptyStateProps';



export default function TrainerLibraryEmptyState({ search }: TrainerLibraryEmptyStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center text-center text-secondary">
      <Apple size={18} className="mb-3 text-secondary" aria-hidden="true" />
      <p className="text-base font-semibold text-secondary">No diet plans found</p>
      <p className="mt-1 text-sm">{search ? 'Try a different search term.' : 'Diet plans will appear here when your manager publishes them.'}</p>
    </div>
  );
}

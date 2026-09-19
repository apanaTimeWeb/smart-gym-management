import type { LibraryView } from '@/app/manager/library/library_types/ManagerLibraryTypes';

export interface ManagerLibraryEmptyStateProps {
  view: LibraryView;
  onAdd: () => void;
}

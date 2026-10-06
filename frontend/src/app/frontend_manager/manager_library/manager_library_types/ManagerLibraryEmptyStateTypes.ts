import type { LibraryView } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes';

export interface ManagerLibraryEmptyStateProps {
  view: LibraryView;
  onAdd: () => void;
}

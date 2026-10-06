// RESPONSIBILITY: Server route entry for the Manager Diet Library; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerLibraryMain from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_main/ManagerLibraryMain';

/** @description Route-level LibraryPage for the Manager frontend module. */
export default function LibraryPage() {
  return <ManagerLibraryMain />;
}

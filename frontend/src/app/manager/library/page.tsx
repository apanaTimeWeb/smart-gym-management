// RESPONSIBILITY: Server route entry for the Manager Diet Library; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerLibraryMain from '@/app/manager/library/library_components/ManagerLibraryMain/ManagerLibraryMain';

export default function LibraryPage() {
  return <ManagerLibraryMain />;
}

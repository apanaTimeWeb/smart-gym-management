// RESPONSIBILITY: Server route entry for Manager Store; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerStoreMain from '@/app/manager/store/store_components/ManagerStoreMain/ManagerStoreMain';

export const dynamic = 'force-dynamic';

export default function StorePage() {
  return <ManagerStoreMain />;
}

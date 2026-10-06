// RESPONSIBILITY: Server route entry for Manager Store; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerStoreMain from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_main/ManagerStoreMain';

export const dynamic = 'force-dynamic';

/** @description Route-level StorePage for the Manager frontend module. */
export default function StorePage() {
  return <ManagerStoreMain />;
}

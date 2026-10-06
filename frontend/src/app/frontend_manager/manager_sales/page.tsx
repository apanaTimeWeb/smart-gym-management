// RESPONSIBILITY: Server route entry for Manager Sales; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerSalesMain from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_main/ManagerSalesMain';

export const dynamic = 'force-dynamic';

/** @description Route-level SalesPage for the Manager frontend module. */
export default function SalesPage() {
  return <ManagerSalesMain />;
}

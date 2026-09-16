// RESPONSIBILITY: Server route entry for Manager Sales; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerSalesMain from '@/app/manager/sales/sales_components/ManagerSalesMain/ManagerSalesMain';

export const dynamic = 'force-dynamic';

export default function SalesPage() {
  return <ManagerSalesMain />;
}

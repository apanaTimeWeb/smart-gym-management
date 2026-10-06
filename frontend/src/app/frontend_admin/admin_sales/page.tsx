// RESPONSIBILITY: Server route entry point for Admin Sales. Data is owned by the client TanStack Query layer.
import AdminSalesMain from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_main/AdminSalesMain';

/** Sales route entry point. Server rendering intentionally does not prefetch because no server-compatible module mock transport is supplied. */
export default function SalesPage() {
  return <AdminSalesMain />;
}

// RESPONSIBILITY: Server route entry point for Admin Finance. Data is owned by the client TanStack Query layer.
import AdminFinanceMain from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_main/AdminFinanceMain';

/** Finance route entry point. Server rendering intentionally does not prefetch because no server-compatible module mock transport is supplied. */
export default function FinancePage() {
  return <AdminFinanceMain />;
}

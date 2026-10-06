import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server Component entry point for the Branch P&L Comparison page.
// Keeps this as a Server Component (Rule 8) — no , no hooks.
import AdminFinancePnl from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnl';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_finance.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminFinancePnlPage renders the admin finance pnl page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminFinancePnlPage() {
  return (
      <AdminFinancePnl />
  );
}
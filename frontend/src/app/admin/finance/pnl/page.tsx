// RESPONSIBILITY: Server Component entry point for the Branch P&L Comparison page.
// Keeps this as a Server Component (Rule 8) — no "use client", no hooks.
import AdminFinancePnlMain from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlMain';

export const metadata = {
  title: 'Branch P&L Comparison | Finance | Smart Gym 360',
  description: 'Compare profit and loss across all branches — revenue, expenses, and net profit side by side.',
};

export default function AdminFinancePnlPage() {
  return <AdminFinancePnlMain />;
}

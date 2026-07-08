"use client";

import { useFinanceContext } from '../../finance_context/FinanceContext';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function RevenueByMethod() {
  const { summary } = useFinanceContext();
  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 finance-module">
      {Object.entries(summary.revenueByMethod).map(([method, amount]) => (
        <div key={method} className="rounded-xl p-4 shadow-sm border" style={{ backgroundColor: 'var(--finance-bg-card)', borderColor: 'var(--finance-border)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--finance-text-secondary)' }}>{method}</p>
          <p className="text-lg font-bold" style={{ color: 'var(--finance-text-primary)' }}>{fmt(amount as number)}</p>
        </div>
      ))}
    </div>
  );
}

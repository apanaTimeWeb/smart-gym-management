// RESPONSIBILITY: Renders the ManagerFinanceMethodBreakdown sub-view extracted from ManagerFinanceRevenueChart; owns only this presentation responsibility.
'use client';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { FINANCE_METHOD_STYLES } from '@/app/manager/finance/finance_utils/ManagerFinanceSharedConstants';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';


export function ManagerFinanceMethodBreakdown({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <p className="text-sm font-semibold text-primary">Revenue by Method</p>
      {Object.entries(data).map(([method, amount]) => {
        const pct = Math.round((amount / total) * 100);
        const s = FINANCE_METHOD_STYLES[method] ?? { bg: 'bg-input', text: 'text-secondary' };
        return (
          <div key={method} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className={`font-semibold ${s.text}`}>{method}</span>
              <span className="text-secondary">{formatCurrencyFromMinorUnits(amount, ManagerEnvConfig.currencyCode)} ({pct}%)</span>
            </div>
            <div className="h-2 bg-input rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.bg.replace('/10', '')} motion-safe:transition-all motion-safe:duration-xslow`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

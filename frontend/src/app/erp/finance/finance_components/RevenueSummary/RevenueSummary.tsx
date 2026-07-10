"use client";

import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function RevenueSummary() {
 const { summary } = useFinanceContext();
 if (!summary) return null;

 return (
 <div className="space-y-4 finance-module">
 <h3 className="font-semibold" style={{ color: 'var(--finance-text-primary)' }}>Monthly Revenue (Last 6 Months)</h3>
 <div className="space-y-2">
 {summary.monthlyData.map((d, i) => {
 const max = Math.max(...summary.monthlyData.map(x => x.revenue), 1);
 return (
 <div key={i} className="flex items-center gap-3">
 <span className="text-xs w-20" style={{ color: 'var(--finance-text-secondary)' }}>{d.month}</span>
 <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--finance-bg-input)' }}>
 <div 
 className="h-full rounded-full flex items-center pl-3" 
 style={{ width: `${(d.revenue / max) * 100}%`, backgroundColor: 'var(--finance-highlight)' }}
 >
 {d.revenue > 0 && <span className="text-xs text-white font-medium">{fmt(d.revenue)}</span>}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
}

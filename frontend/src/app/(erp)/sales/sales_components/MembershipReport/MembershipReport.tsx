"use client";

import { membershipReport } from '../../sales_utils/SalesSharedConstants';

export default function MembershipReport() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-black/5 dark:bg-white/5">
          <tr>
            {['Plan', 'Total Receivable', 'Amount Received', 'Remaining', 'Refund'].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-[var(--sales-text-secondary)] uppercase tracking-wider px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--sales-border)]">
          {membershipReport.map((r, i) => (
            <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.plan}</td>
              <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">₹{r.receivable.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-500">₹{r.received.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-medium text-yellow-600 dark:text-yellow-500">₹{r.remaining.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-red-500">₹{r.refund.toLocaleString()}</td>
            </tr>
          ))}
          <tr className="bg-black/5 dark:bg-white/5 font-semibold border-t-2 border-[var(--sales-border)]">
            <td className="px-4 py-3 text-sm text-[var(--sales-text-primary)]">Total</td>
            <td className="px-4 py-3 text-sm text-[var(--sales-text-primary)]">₹4,82,500</td>
            <td className="px-4 py-3 text-sm text-green-700 dark:text-green-400">₹4,53,600</td>
            <td className="px-4 py-3 text-sm text-yellow-700 dark:text-yellow-400">₹28,900</td>
            <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">₹5,200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

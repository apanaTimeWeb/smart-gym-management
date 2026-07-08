"use client";

import { useState } from 'react';
import { allMemberships } from '../../sales_utils/SalesSharedConstants';

export default function AllMemberships() {
  const [filter, setFilter] = useState('All');

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'Active', 'Expiring Soon', 'Expired'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 text-xs rounded-full font-medium border transition-colors" 
            style={f === filter 
              ? { background: 'var(--sales-highlight)', color: 'white', borderColor: 'transparent' } 
              : { borderColor: 'var(--sales-border)', color: 'var(--sales-text-secondary)' }
            }
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              {['Member', 'Plan', 'Start', 'End Date', 'Status', 'Amount', 'Days Left'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--sales-text-secondary)] uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sales-border)]">
            {allMemberships.map((r, i) => (
              <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.plan}</td>
                <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.start}</td>
                <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.end}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    r.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.amount}</td>
                <td className="px-4 py-3 text-sm font-medium" style={{ 
                  color: r.days < 0 ? '#ef4444' : r.days <= 7 ? '#ef4444' : r.days <= 30 ? '#f59e0b' : '#22c55e' 
                }}>
                  {r.days < 0 ? `${Math.abs(r.days)}d ago` : `${r.days} days`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

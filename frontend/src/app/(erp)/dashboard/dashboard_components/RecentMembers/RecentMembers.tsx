"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useDashboardContext } from '../../dashboard_context/DashboardContext';
import { RECENT_MEMBERS_HEADERS, DASHBOARD_STATUS_STYLES } from '../../dashboard_utils/DashboardSharedConstants';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function RecentMembers() {
  const { stats } = useDashboardContext();
  const [search, setSearch] = useState('');

  if (!stats) return null;
  const members = stats.recentMembers || [];

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    ((m.plan as any)?.name || m.plan || '').toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="xl:col-span-2 rounded-xl shadow-sm border overflow-hidden dashboard-module" style={{ backgroundColor: 'var(--dashboard-bg-card)', borderColor: 'var(--border)' }}>
    {/* Header */}
    <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
      <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Members</h2>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search members..."
            className="pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 w-40 sm:w-52"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        <Link href="/members" className="text-sm font-medium hover:underline whitespace-nowrap" style={{ color: 'var(--primary)' }}>View all</Link>
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: 'rgba(99,102,241,0.08)' }}>
          <tr>
            {RECENT_MEMBERS_HEADERS.map(h => (
              <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {filtered.map((m) => {
            const statusStyle = DASHBOARD_STATUS_STYLES[m.status] || { bg: 'var(--dashboard-status-default-bg)', text: 'var(--dashboard-status-default-text)' };
            return (
              <tr key={m.id} className="transition-colors hover:bg-[rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--bg-card)' }}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm" style={{ backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)' }}>
                      {m.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{m.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{(m.plan as any)?.name || m.plan || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(m.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{fmt(m.paidAmount)}</td>
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {search ? `No members matching "${search}"` : 'No members yet. Add your first member!'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}

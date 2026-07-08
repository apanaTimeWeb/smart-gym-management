"use client";

import Link from 'next/link';
import { useDashboardContext } from '../../dashboard_context/DashboardContext';
import { RECENT_MEMBERS_HEADERS, DASHBOARD_STATUS_STYLES } from '../../dashboard_utils/DashboardSharedConstants';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function RecentMembers() {
 const { stats } = useDashboardContext();
 if (!stats) return null;
 const s = stats;

 return (
 <div className="xl:col-span-2 rounded-xl shadow-sm border overflow-hidden dashboard-module" style={{ backgroundColor: 'var(--dashboard-bg-card)', borderColor: 'var(--border)' }}>
 <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
 <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Members</h2>
 <Link href="/members" className="text-sm font-medium hover:underline" style={{ color: 'var(--primary)' }}>View all</Link>
 </div>
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
 {(s.recentMembers || []).map((m) => {
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
 <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
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
 {(s.recentMembers || []).length === 0 && (
 <tr><td colSpan={5} className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>No members yet. Add your first member!</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
}

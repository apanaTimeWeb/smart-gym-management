"use client";

import { useHrContext } from '../../hr_context/HrContext';
import { PAYROLL_TABLE_HEADERS } from '../../hr_utils/HrSharedConstants';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function PayrollTable() {
 const { payrolls, markPayrollPaid } = useHrContext();

 return (
 <div className="overflow-x-auto hr-module">
 <table className="w-full">
 <thead style={{ backgroundColor: 'var(--hr-bg-input)' }}>
 <tr>
 {PAYROLL_TABLE_HEADERS.map(h => (
 <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3" style={{ color: 'var(--hr-text-secondary)' }}>
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y" style={{ borderColor: 'var(--hr-border)' }}>
 {payrolls.map(p => (
 <tr key={p.id} className="transition-colors hover:bg-[rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--hr-bg-card)' }}>
 <td className="px-4 py-3">
 <p className="text-sm font-medium" style={{ color: 'var(--hr-text-primary)' }}>
 {p.staff?.name || `Staff #${p.staffId}`}
 </p>
 <div className="text-xs" style={{ color: 'var(--hr-text-secondary)' }}>
 {p.staff?.role}
 </div>
 </td>
 <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-primary)' }}>{p.month}</td>
 <td className="px-4 py-3 text-sm font-bold" style={{ color: 'var(--hr-kpi-green-text)' }}>{fmt(p.amount)}</td>
 <td className="px-4 py-3">
 <span 
 className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium" 
 style={{ 
 backgroundColor: p.status === 'Paid' ? 'var(--hr-status-paid-bg)' : 'var(--hr-status-pending-bg)', 
 color: p.status === 'Paid' ? 'var(--hr-status-paid-text)' : 'var(--hr-status-pending-text)' 
 }}
 >
 {p.status}
 </span>
 </td>
 <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>
 {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN') : '—'}
 </td>
 <td className="px-4 py-3">
 {p.status !== 'Paid' && (
 <button 
 onClick={() => markPayrollPaid(p.id)} 
 className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ backgroundColor: 'var(--hr-highlight)' }}
 >
 Mark Paid
 </button>
 )}
 </td>
 </tr>
 ))}
 {payrolls.length === 0 && (
 <tr>
 <td colSpan={6} className="text-center py-10 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>
 No payroll records yet.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 );
}

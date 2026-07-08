"use client";

import { useInquiriesContext } from '../../inquiries_context/InquiriesContext';
import { INQUIRIES_TABLE_HEADERS, INQUIRIES_STATUS_LABELS, INQUIRIES_STATUS_STYLES } from '../../inquiries_utils/InquiriesSharedConstants';
import { MessageCircle, Mail, Edit2, Trash2 } from 'lucide-react';

export default function InquiriesTable() {
 const { inquiries, search, statusFilter, loading, updateStatus, openMsg, openEdit, deleteInquiry } = useInquiriesContext();

 const filtered = inquiries.filter(inq => {
 const ms = inq.name.toLowerCase().includes(search.toLowerCase()) || inq.phone.includes(search);
 const mf = statusFilter === 'All' || inq.status === statusFilter;
 return ms && mf;
 });

 if (loading) {
 return (
 <div className="rounded-xl shadow-sm border overflow-hidden flex justify-center py-10 inquiries-module" style={{ backgroundColor: 'var(--inquiries-bg-card)', borderColor: 'var(--inquiries-border)' }}>
 <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--inquiries-highlight)', borderTopColor: 'transparent' }} />
 </div>
 );
 }

 return (
 <div className="rounded-xl shadow-sm border overflow-hidden inquiries-module" style={{ backgroundColor: 'var(--inquiries-bg-card)', borderColor: 'var(--inquiries-border)' }}>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead style={{ backgroundColor: 'var(--inquiries-bg-input)' }}>
 <tr>
 {INQUIRIES_TABLE_HEADERS.map(h => (
 <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--inquiries-text-secondary)' }}>
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y" style={{ borderColor: 'var(--inquiries-border)' }}>
 {filtered.map(inq => {
 const statusStyle = INQUIRIES_STATUS_STYLES[inq.status] || { bg: 'var(--inquiries-bg-input)', text: 'var(--inquiries-text-primary)' };
 return (
 <tr key={inq.id} className="transition-colors hover:bg-[rgba(99,102,241,0.06)]">
 <td className="px-5 py-3.5">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--inquiries-kpi-orange-bg)', color: 'var(--inquiries-kpi-orange-text)' }}>
 {inq.name.charAt(0)}
 </div>
 <p className="text-sm font-semibold" style={{ color: 'var(--inquiries-text-primary)' }}>{inq.name}</p>
 </div>
 </td>
 <td className="px-5 py-3.5">
 <p className="text-sm" style={{ color: 'var(--inquiries-text-primary)' }}>{inq.phone}</p>
 <p className="text-xs" style={{ color: 'var(--inquiries-text-secondary)' }}>{inq.email || '—'}</p>
 </td>
 <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--inquiries-text-primary)' }}>{inq.interest}</td>
 <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--inquiries-text-secondary)' }}>{inq.source || '—'}</td>
 <td className="px-5 py-3.5">
 <select 
 value={inq.status} 
 onChange={e => updateStatus(inq.id, e.target.value)}
 className="text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none"
 style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
 >
 {Object.entries(INQUIRIES_STATUS_LABELS).map(([val, label]) => (
 <option key={val} value={val}>{label}</option>
 ))}
 </select>
 </td>
 <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--inquiries-text-secondary)' }}>
 {new Date(inq.createdAt).toLocaleDateString('en-IN')}
 </td>
 <td className="px-5 py-3.5">
 <div className="flex items-center gap-2">
 <button 
 onClick={() => openMsg(inq, 'whatsapp')} 
 className="p-1.5 rounded-lg text-white transition-opacity hover:opacity-80" 
 style={{ backgroundColor: '#25D366' }} 
 title="WhatsApp"
 >
 <MessageCircle size={13} />
 </button>
 <button 
 onClick={() => openMsg(inq, 'email')} 
 className="p-1.5 rounded-lg text-white transition-opacity hover:opacity-80" 
 style={{ backgroundColor: 'hsl(217 91% 60%)' }} 
 title="Email"
 >
 <Mail size={13} />
 </button>
 <button 
 onClick={() => openEdit(inq)} 
 className="p-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5" 
 style={{ color: 'var(--inquiries-text-secondary)' }}
 title="Edit"
 >
 <Edit2 size={13} />
 </button>
 <button 
 onClick={() => deleteInquiry(inq.id)} 
 className="p-1.5 rounded-lg transition-colors hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)]" 
 style={{ color: 'var(--inquiries-status-lost-text)', backgroundColor: 'var(--inquiries-status-lost-bg)' }}
 title="Delete"
 >
 <Trash2 size={13} />
 </button>
 </div>
 </td>
 </tr>
 );
 })}
 {filtered.length === 0 && (
 <tr>
 <td colSpan={7} className="text-center py-12 text-sm" style={{ color: 'var(--inquiries-text-secondary)' }}>
 No inquiries found.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
}

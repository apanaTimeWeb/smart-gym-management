"use client";

import { useInquiriesContext } from '../../inquiries_context/InquiriesContext';
import { INQUIRIES_STATUS_LABELS } from '../../inquiries_utils/InquiriesSharedConstants';
import { RefreshCw, Plus } from 'lucide-react';

export default function InquiriesToolbar() {
 const { search, setSearch, statusFilter, setStatusFilter, loadAll, openAdd } = useInquiriesContext();

 return (
 <div className="rounded-xl shadow-sm border p-4 flex flex-wrap gap-3 items-center justify-between inquiries-module" style={{ backgroundColor: 'var(--inquiries-bg-card)', borderColor: 'var(--inquiries-border)' }}>
 <input 
 value={search} 
 onChange={e => setSearch(e.target.value)} 
 placeholder="Search name or phone..." 
 className="border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--inquiries-highlight)] w-64"
 style={{ backgroundColor: 'var(--inquiries-bg-input)', borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 />
 <div className="flex gap-2">
 <select 
 value={statusFilter} 
 onChange={e => setStatusFilter(e.target.value)} 
 className="border rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--inquiries-highlight)]"
 style={{ backgroundColor: 'var(--inquiries-bg-input)', borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-primary)' }}
 >
 <option value="All">All Status</option>
 {Object.entries(INQUIRIES_STATUS_LABELS).map(([val, label]) => (
 <option key={val} value={val}>{label}</option>
 ))}
 </select>
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2.5 text-sm border rounded-xl hover:opacity-80 transition-opacity"
 style={{ borderColor: 'var(--inquiries-border)', color: 'var(--inquiries-text-secondary)' }}
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={openAdd} 
 className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity" 
 style={{ backgroundColor: 'var(--inquiries-highlight)' }}
 >
 <Plus size={16} /> Add Inquiry
 </button>
 </div>
 </div>
 );
}

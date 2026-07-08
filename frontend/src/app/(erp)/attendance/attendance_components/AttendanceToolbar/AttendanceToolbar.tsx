"use client";

import { RefreshCw, Plus, Search } from 'lucide-react';
import { useAttendanceContext } from '../../attendance_context/AttendanceContext';
import { ATTENDANCE_TABS } from '../../attendance_utils/AttendanceSharedConstants';

export default function AttendanceToolbar() {
  const { tab, setTab, loadAll, setShowModal, search, setSearch, setCurrentPage } = useAttendanceContext();

 return (
 <div className="border-b border-[var(--attendance-border)] flex justify-between items-center">
 <div className="flex">
 {ATTENDANCE_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
 tab === t 
 ? 'text-[var(--attendance-highlight)] bg-[var(--attendance-highlight-subtle)]' 
 : 'border-transparent text-[var(--attendance-text-secondary)] hover:text-[var(--attendance-text-primary)]'
 }`}
 style={tab === t ? { borderBottomColor: 'var(--attendance-highlight)' } : {}}
 >
 {t}
 </button>
 ))}
 </div>
  <div className="px-4 flex flex-wrap gap-3 items-center">
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--attendance-text-secondary)]" />
      <input 
        value={search} 
        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
        placeholder={`Search ${tab.toLowerCase()}...`} 
        className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 w-40 sm:w-64"
        style={{ 
          backgroundColor: 'var(--attendance-bg-input)', 
          borderColor: 'var(--attendance-border)', 
          color: 'var(--attendance-text-primary)' 
        }} 
      />
    </div>
    <div className="flex gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--attendance-border)] rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--attendance-text-secondary)] transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={() => setShowModal(true)} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90" 
 style={{ background: 'var(--attendance-highlight)' }}
 >
 <Plus size={14} /> Mark Attendance
 </button>
 </div>
 </div>
 </div>
 );
}

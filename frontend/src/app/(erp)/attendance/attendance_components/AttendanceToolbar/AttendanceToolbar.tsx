"use client";

import { RefreshCw, Plus } from 'lucide-react';
import { useAttendanceContext } from '../../attendance_context/AttendanceContext';
import { ATTENDANCE_TABS } from '../../attendance_utils/AttendanceSharedConstants';

export default function AttendanceToolbar() {
 const { tab, setTab, loadAll, setShowModal } = useAttendanceContext();

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
 <div className="px-4 flex gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--attendance-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--attendance-text-secondary)] transition-colors"
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
 );
}

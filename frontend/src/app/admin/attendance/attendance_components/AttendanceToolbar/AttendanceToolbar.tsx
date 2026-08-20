// RESPONSIBILITY: Provides the search, filter tabs, and action buttons for the Attendance module.
'use client';

import { RefreshCw, Plus, Search } from 'lucide-react';
import { useAttendanceContext } from '@/app/admin/attendance/attendance_context/AttendanceContext';
import { ATTENDANCE_TABS } from '@/app/admin/attendance/attendance_utils/AttendanceSharedConstants';

export default function AttendanceToolbar() {
  const { tab, setTab, loadAll, setShowModal, search, setSearch, setCurrentPage } = useAttendanceContext();

 return (
 <div className="border-b border-border flex justify-between items-center">
 <div className="flex">
 {ATTENDANCE_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
 tab === t 
 ? 'text-primary bg-primary-subtle border-primary' 
 : 'border-transparent text-secondary hover:text-foreground'
 }`}
 >
 {t}
 </button>
 ))}
 </div>
  <div className="px-4 flex flex-wrap gap-3 items-center">
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
      <input 
        value={search} 
        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
        placeholder={`Search ${tab.toLowerCase()}...`} 
        className="pl-9 pr-3 py-2 border border-border bg-input text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-64"
      />
    </div>
    <div className="flex gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={() => setShowModal(true)} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg transition-opacity hover:opacity-90" 
 >
 <Plus size={14} /> Mark Attendance
 </button>
 </div>
 </div>
 </div>
 );
}

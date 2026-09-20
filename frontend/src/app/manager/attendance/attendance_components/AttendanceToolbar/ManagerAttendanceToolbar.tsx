'use client';
// RESPONSIBILITY: Provides the search, filter tabs, and action buttons for the Attendance module.
import { useState, useEffect } from 'react';
import { RefreshCw, Plus, Search, Download } from 'lucide-react';
import { useManagerAttendanceLogic } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceLogic';
import { ATTENDANCE_TABS } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';

export default function ManagerAttendanceToolbar() {
  const { tab, setTab, loadAll, setShowModal, search, setSearch, dateFilter, setDateFilter, statusFilter, setStatusFilter, setCurrentPage, exportAttendance } = useManagerAttendanceLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch, setCurrentPage]);

 return (
 <div className="border-b border-border flex flex-col lg:flex-row justify-between items-start lg:items-center">
 <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar">
 {ATTENDANCE_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`whitespace-nowrap px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
 tab === t 
 ? 'text-on-primary bg-primary-subtle border-primary' 
 : 'border-transparent text-secondary hover:text-primary'
 }`}
 >
 {t}
 </button>
 ))}
 </div>
  <div className="p-4 flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto border-t lg:border-t-0 border-border">
    <div className="relative w-full sm:w-auto">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
      <input 
        value={localSearch} 
        onChange={e => setLocalSearch(e.target.value)} 
        placeholder={`Search ${tab.toLowerCase()}...`} 
        className="pl-9 pr-3 py-2 border border-border bg-input text-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
      />
    </div>
    
    <div className="w-full sm:w-auto">
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="px-3 py-2 border border-border bg-input text-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
    </div>
    
    <div className="w-full sm:w-auto z-30">
      <ManagerSearchableDropdown
        value={statusFilter || 'All'}
        onChange={(v) => setStatusFilter(String(v) === 'All' ? '' : String(v))}
        options={[{label: 'All Status', value: 'All'}, {label: 'Present', value: 'Present'}, {label: 'Absent', value: 'Absent'}, {label: 'Late', value: 'Late'}]}
        placeholder="Status"
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto ml-auto">
 <button 
 type="button"
 aria-label="Refresh attendance"
 onClick={loadAll} 
 className="min-h-11 min-w-11 flex justify-center items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
 >
 <RefreshCw size={18} />
 </button>
 <button 
 onClick={() => exportAttendance && exportAttendance()} 
 className="flex justify-center items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-info-bg text-info motion-safe:transition-colors w-full sm:w-auto"
 >
 <Download size={18} /> Export
 </button>
 <button 
 onClick={() => setShowModal(true)} 
 className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold text-on-info bg-primary-subtle rounded-lg motion-safe:transition-opacity hover:opacity-90 w-full sm:w-auto" 
 >
 <Plus size={18} /> Mark Attendance
 </button>
 </div>
 </div>
 </div>
 );
}


// RESPONSIBILITY: Renders the attendance data table and pagination controls.
'use client';

import { Clock } from 'lucide-react';
import { useAttendanceContext } from '@/app/manager/attendance/attendance_context/AttendanceContext';
import { ATTENDANCE_TABLE_HEADERS, formatDate, formatTime } from '@/app/manager/attendance/attendance_utils/AttendanceSharedConstants';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';

export default function AttendanceTable() {
  const { records, totalRecords, fetchState, currentPage, setCurrentPage } = useAttendanceContext();

  
  const totalPages = Math.ceil(totalRecords / MANAGER_ITEMS_PER_PAGE) || 1;

  return (
 <div className="p-5">
  {fetchState === 'loading' ? (
    <div className="animate-pulse bg-card rounded-xl border border-border mt-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 border-b border-border flex items-center px-4 gap-4">
          <div className="h-8 w-8 bg-muted rounded-full"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
          <div className="h-4 bg-muted rounded-full w-16"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
      ))}
    </div>
  ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input">
 <tr>
 {ATTENDANCE_TABLE_HEADERS.map(h => (
 <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {records.map(r => (
 <tr key={r.id} className="hover:bg-primary-subtle transition-colors">
 <td className="px-4 py-3">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
 r.type === 'MEMBER' ? 'bg-info' : 'bg-success'
 }`}>
 {(r.member?.name || r.staff?.name || '?').charAt(0)}
 </div>
 <span className="text-sm font-medium text-foreground">
 {r.member?.name || r.staff?.name || '—'}
 </span>
 </div>
 </td>
 <td className="px-4 py-3">
 <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
 r.type === 'MEMBER' 
 ? 'bg-info-bg text-info dark:bg-info-bg dark:text-info' 
 : 'bg-success-bg text-success dark:bg-success-bg dark:text-success'
 }`}>
 {r.type}
 </span>
 </td>
 <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.date)}</td>
 <td className="px-4 py-3 text-sm text-secondary flex items-center gap-1">
 <Clock size={13} className="opacity-50" />
 {formatTime(r.checkIn)}
 </td>
 <td className="px-4 py-3 text-sm text-secondary">{formatTime(r.checkOut)}</td>
 </tr>
 ))}
 {records.length === 0 && (
 <tr>
 <td colSpan={5} className="text-center py-10 text-secondary">
 No attendance records found.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 )}
 
 {totalPages > 1 && (
    <div className="border-t border-border mt-4 pt-4">
      <ManagerPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )}
  </div>
  );
}

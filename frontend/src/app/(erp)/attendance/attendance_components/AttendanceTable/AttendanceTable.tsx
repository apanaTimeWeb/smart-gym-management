"use client";

import { Clock } from 'lucide-react';
import { useAttendanceContext } from '../../attendance_context/AttendanceContext';
import { ATTENDANCE_TABLE_HEADERS, formatDate, formatTime } from '../../attendance_utils/AttendanceSharedConstants';
import ErpPagination from '../../../erp_components/ErpPagination';

export default function AttendanceTable() {
  const { records, tab, loading, search, currentPage, setCurrentPage } = useAttendanceContext();

  const filtered = records.filter(r => {
    const matchTab = tab === 'All' ? true : tab === 'Members' ? r.type === 'MEMBER' : r.type === 'STAFF';
    const matchSearch = (r.member?.name || '').toLowerCase().includes(search.toLowerCase()) || 
                        (r.staff?.name || '').toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
 <div className="p-5">
 {loading ? (
 <div className="flex justify-center py-10">
 <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-[var(--bg-input)]">
 <tr>
 {ATTENDANCE_TABLE_HEADERS.map(h => (
 <th key={h} className="text-left text-xs font-semibold text-[var(--attendance-text-secondary)] uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--attendance-border)]">
 {paginated.map(r => (
 <tr key={r.id} className="hover:bg-[var(--primary-subtle)] transition-colors">
 <td className="px-4 py-3">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
 r.type === 'MEMBER' ? 'bg-[var(--info)]' : 'bg-[var(--success)]'
 }`}>
 {(r.member?.name || r.staff?.name || '?').charAt(0)}
 </div>
 <span className="text-sm font-medium text-[var(--attendance-text-primary)]">
 {r.member?.name || r.staff?.name || '—'}
 </span>
 </div>
 </td>
 <td className="px-4 py-3">
 <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
 r.type === 'MEMBER' 
 ? 'bg-[var(--info-bg)] text-[var(--info)] dark:bg-[var(--info-bg)] dark:text-[var(--info)]' 
 : 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]'
 }`}>
 {r.type}
 </span>
 </td>
 <td className="px-4 py-3 text-sm text-[var(--attendance-text-secondary)]">{formatDate(r.date)}</td>
 <td className="px-4 py-3 text-sm text-[var(--attendance-text-secondary)] flex items-center gap-1">
 <Clock size={13} className="opacity-50" />
 {formatTime(r.checkIn)}
 </td>
 <td className="px-4 py-3 text-sm text-[var(--attendance-text-secondary)]">{formatTime(r.checkOut)}</td>
 </tr>
 ))}
 {filtered.length === 0 && !loading && (
 <tr>
 <td colSpan={5} className="text-center py-10 text-[var(--attendance-text-secondary)]">
 No attendance records found.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 )}
 
 {!loading && totalPages > 1 && (
    <div className="border-t border-[var(--attendance-border)] mt-4 pt-4">
      <ErpPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        colors={{
          text: 'var(--attendance-text-secondary)',
          textActive: 'white',
          bgActive: 'var(--attendance-highlight)',
          border: 'var(--attendance-border)',
          hoverBg: 'var(--attendance-highlight-subtle)'
        }}
      />
    </div>
  )}
  </div>
  );
}

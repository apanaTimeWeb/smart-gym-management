// RESPONSIBILITY: Renders the paginated staff members table with sortable columns and inline row actions.
'use client';

import { useHrContext } from '@/app/manager/hr/hr_context/HrContext';
import { STAFF_TABLE_HEADERS } from '@/app/manager/hr/hr_utils/HrSharedConstants';
import { Edit2, Trash2, CheckCircle2, Ban } from 'lucide-react';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';

export default function StaffTable() {
  const { staff, summary, fetchState, debouncedSearch, currentPage, setCurrentPage, openEdit, deleteStaff } = useHrContext();

  // Remove client-side filtering; API handles it now.
    const totalStaff = summary?.totalStaff || staff.length;
  const totalPages = Math.ceil(totalStaff / MANAGER_ITEMS_PER_PAGE) || 1;

  if (fetchState === 'loading') {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-input text-secondary">
              <tr>
                {STAFF_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted"></div>
                    <div><div className="h-4 bg-muted rounded w-24 mb-1"></div><div className="h-3 bg-muted rounded w-32"></div></div>
                  </td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-6 bg-muted rounded w-16 ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>
              {STAFF_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map(s => (
              <tr 
                key={s.id} 
                className="transition-colors hover:bg-primary/5 cursor-pointer" 
                onClick={() => openEdit(s)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary/10 text-primary">
                      {(s.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{s.name || 'Unknown Staff'}</p>
                      <p className="text-xs text-secondary">{s.email || 'No email'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{s.role}</td>
                <td className="px-4 py-3">
                  {s.isActive === false ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-danger/10 text-danger border border-danger/20">
                      <Ban className="w-3 h-3" /> Suspended
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success/10 text-success border border-success/20">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-secondary">{s.phone}</td>
                <td className="px-4 py-3 text-sm font-medium text-success">{(s.salary || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {new Date(s.joinDate).toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEdit(s); }} 
                      className="p-1.5 rounded hover:bg-primary/10 transition-colors text-secondary hover:text-primary"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteStaff(s.id); }} 
                      className="p-1.5 rounded transition-colors text-danger hover:bg-danger/10"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-secondary">
                  {debouncedSearch ? 'No staff match the filter.' : 'No staff members yet. Add your first staff!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalStaff} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

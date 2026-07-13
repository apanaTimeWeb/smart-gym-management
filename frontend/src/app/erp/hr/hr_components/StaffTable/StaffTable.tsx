// RESPONSIBILITY: StaffTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import { useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import { STAFF_TABLE_HEADERS } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function StaffTable() {
  const { staff, fetchState, debouncedSearch, currentPage, setCurrentPage, openEdit, deleteStaff } = useHrContext();

  const filtered = staff.filter(s => 
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    s.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.role.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.branch.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (fetchState === 'loading') {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
            {currentData.map(s => (
              <tr 
                key={s.id} 
                className="transition-colors hover:bg-primary/5 cursor-pointer" 
                onClick={() => openEdit(s)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary/10 text-primary">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{s.name}</p>
                      <p className="text-xs text-secondary">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{s.role}</td>
                <td className="px-4 py-3 text-sm text-secondary">{s.phone}</td>
                <td className="px-4 py-3 text-sm text-secondary">{s.branch}</td>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-secondary">
                  {debouncedSearch ? 'No staff match the filter.' : 'No staff members yet. Add your first staff!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ErpPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={filtered.length} 
        itemsPerPage={ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

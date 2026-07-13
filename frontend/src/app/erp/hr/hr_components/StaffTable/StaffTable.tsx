// RESPONSIBILITY: StaffTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import { useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import { STAFF_TABLE_HEADERS } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import { Edit2, Trash2 } from 'lucide-react';
const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function StaffTable() {
  const { staff, debouncedSearch, currentPage, setCurrentPage, openEdit, deleteStaff } = useHrContext();

  const filtered = staff.filter(s => 
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    s.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.role.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.branch.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="overflow-x-auto hr-module flex-1">
        <table className="w-full">
          <thead style={{ backgroundColor: 'var(--hr-bg-input)' }}>
            <tr>
              {STAFF_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3" style={{ color: 'var(--hr-text-secondary)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--hr-border)' }}>
            {currentData.map(s => (
              <tr 
                key={s.id} 
                className="transition-colors hover:bg-[rgba(99,102,241,0.06)] cursor-pointer" 
                style={{ backgroundColor: 'var(--hr-bg-card)' }}
                onClick={() => openEdit(s)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--hr-kpi-blue-bg)', color: 'var(--hr-kpi-blue-text)' }}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--hr-text-primary)' }}>{s.name}</p>
                      <p className="text-xs" style={{ color: 'var(--hr-text-secondary)' }}>{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-primary)' }}>{s.role}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>{s.phone}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>{s.branch}</td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--hr-kpi-green-text)' }}>{fmt(s.salary)}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>
                  {new Date(s.joinDate).toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEdit(s); }} 
                      className="p-1.5 rounded-lg transition-colors hover:bg-primary-subtle" 
                      style={{ color: 'var(--hr-text-secondary)' }}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteStaff(s.id); }} 
                      className="p-1.5 rounded-lg transition-colors hover:bg-danger-bg" 
                      style={{ color: 'var(--hr-kpi-red-text)', backgroundColor: 'var(--hr-kpi-red-bg)' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
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

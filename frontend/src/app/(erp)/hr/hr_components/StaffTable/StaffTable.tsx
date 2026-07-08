"use client";

import { useHrContext } from '../../hr_context/HrContext';
import { STAFF_TABLE_HEADERS } from '../../hr_utils/HrSharedConstants';
import { Edit2, Trash2 } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function StaffTable() {
  const { staff, openEdit, deleteStaff } = useHrContext();

  return (
    <div className="overflow-x-auto hr-module">
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
        <tbody className="divide-y" style={{ divideColor: 'var(--hr-border)' }}>
          {staff.map(s => (
            <tr key={s.id} className="transition-colors hover:bg-[rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--hr-bg-card)' }}>
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
                    onClick={() => openEdit(s)} 
                    className="p-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5" 
                    style={{ color: 'var(--hr-text-secondary)' }}
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => deleteStaff(s.id)} 
                    className="p-1.5 rounded-lg transition-colors hover:bg-red-100" 
                    style={{ color: 'var(--hr-kpi-red-text)', backgroundColor: 'var(--hr-kpi-red-bg)' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {staff.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-10 text-sm" style={{ color: 'var(--hr-text-secondary)' }}>
                No staff members added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

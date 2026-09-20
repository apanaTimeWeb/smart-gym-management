"use client";
// RESPONSIBILITY: Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation.

import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import type { AdminHrStaffSortKey } from '@/app/admin/hr/hr_types/AdminHrUiTypes';
import type { AdminHrSortDirection } from '@/app/admin/hr/hr_types/AdminHrSortTypes';
import { ChevronDown, ChevronUp, ChevronsUpDown, Edit2, Trash2, CheckCircle2, Ban, PlayCircle } from 'lucide-react';
import { STAFF_TABLE_HEADERS, HR_ITEMS_PER_PAGE } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { maskSensitiveData } from '@/app/admin/admin_layout/admin_utils/AdminMaskSensitiveData';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';
import AdminHrEmptyState from '@/app/admin/hr/hr_components/AdminHrEmptyState/AdminHrEmptyState';

const STAFF_SORT_KEYS: Partial<Record<string, AdminHrStaffSortKey>> = {
  Name: 'name',
  Branch: 'branch',
  Role: 'role',
  Phone: 'phone',
  Salary: 'salary',
  Advance: 'advanceSalary',
  Joined: 'joinDate',
};

function SortIndicator({ active, direction }: { active: boolean; direction: AdminHrSortDirection }) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" /> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />;
}

export default function AdminHrStaffTable() {
  const {
    staff, status, debouncedSearch, currentPage, setCurrentPage, totalStaff,
    staffSortKey, staffSortDir, setStaffSort, openEdit, openProfile, deleteStaff, toggleStaffStatus,
  } = useHrContext();

  const handleSort = (key: AdminHrStaffSortKey) => {
    const nextDirection: AdminHrSortDirection = staffSortKey === key && staffSortDir === 'asc' ? 'desc' : 'asc';
    setStaffSort(key, nextDirection);
  };

  const renderHeader = (header: string) => {
    const key = STAFF_SORT_KEYS[header];
    if (!key) return header;
    return (
      <button
        type="button"
        onClick={() => handleSort(key)}
        className="inline-flex min-h-[44px] items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        aria-label={`Sort by ${header}`}
        >
        {header}
        <SortIndicator active={staffSortKey === key} direction={staffSortDir} />
      </button>
    );
  };

  if (status === 'pending') {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <table data-admin-responsive-table className="w-full">
            <thead className="bg-input text-secondary"><tr>{STAFF_TABLE_HEADERS.map((header) => <th key={header} aria-sort={STAFF_SORT_KEYS[header] && staffSortKey === STAFF_SORT_KEYS[header] ? (staffSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th></tr></thead>
            <tbody className="divide-y divide-border">
              {['staff-skeleton-1','staff-skeleton-2','staff-skeleton-3','staff-skeleton-4','staff-skeleton-5'].map((key) => (
                <tr key={key} className="motion-safe:animate-pulse motion-safe:duration-base">
                  <td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24 mb-1" /><div className="h-3 bg-skeleton-base rounded w-32" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-20" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-16" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-20" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-6 bg-skeleton-base rounded w-16 ml-auto" /></td>
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
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary"><tr>{STAFF_TABLE_HEADERS.map((header) => <th key={header} aria-sort={STAFF_SORT_KEYS[header] && staffSortKey === STAFF_SORT_KEYS[header] ? (staffSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th></tr></thead>
          <tbody className="divide-y divide-border">
            {staff.map((member) => (
              <tr key={member.id} className="motion-safe:transition-colors hover:bg-surface-hover cursor-pointer motion-safe:duration-base" role="button" tabIndex={0} aria-label={`Open profile for ${member.name || 'staff member'}`} onClick={() => openProfile(member)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProfile(member); } }}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary">{(member.name || '?').charAt(0).toUpperCase()}</div><div><p className="text-sm font-medium text-primary">{displayValue(member.name)}</p><p className="text-xs text-secondary">{displayValue(member.email)}</p></div></div></td>
                <td className="px-4 py-3 text-sm text-secondary">{member.role === 'Manager' && member.assignedBranches && member.assignedBranches.length > 0 ? <div className="flex flex-col"><span className="font-medium text-primary">{displayValue(member.primaryBranchId || member.assignedBranches[0])}</span>{member.assignedBranches.length > 1 && <span className="text-xs bg-primary-subtle text-primary px-1.5 py-0.5 rounded-full mt-1 w-max">+{member.assignedBranches.length - 1} More</span>}</div> : displayValue(member.branch)}</td>
                <td className="px-4 py-3 text-sm text-primary">{displayValue(member.role)}</td>
                <td className="px-4 py-3">{member.isActive === false ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger text-on-danger border border-border"><Ban className="w-3 h-3" /> Suspended</span> : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-on-success border border-border"><CheckCircle2 className="w-3 h-3" /> Active</span>}</td>
                <td className="px-4 py-3 text-sm text-secondary">{maskSensitiveData(member.phone)}</td><td className="px-4 py-3 text-sm font-medium text-success">{formatCurrency(member.salary)}</td><td className="px-4 py-3 text-sm font-medium text-primary text-right">{member.advanceSalary && member.advanceSalary > 0 ? formatCurrency(member.advanceSalary) : '—'}</td><td className="px-4 py-3 text-sm text-secondary">{member.joinDate ? new Date(member.joinDate).toLocaleDateString('en-IN') : displayValue(null)}</td>
                <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); toggleStaffStatus(member); }} className={`min-h-[44px] min-w-[44px] p-1.5 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${member.isActive === false ? 'text-success hover:bg-success' : 'text-danger hover:bg-surface-hover'}`} title={member.isActive === false ? 'Activate Staff' : 'Suspend Staff'} aria-label={member.isActive === false ? `Activate ${member.name}` : `Suspend ${member.name}`}>{member.isActive === false ? <PlayCircle size={16} /> : <Ban size={16} />}</button><button type="button" onClick={(event) => { event.stopPropagation(); openEdit(member); }} className="min-h-[44px] min-w-[44px] p-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:duration-base" title="Edit" aria-label={`Edit ${member.name}`}><Edit2 size={16} /></button><button type="button" onClick={(event) => { event.stopPropagation(); deleteStaff(member.id); }} className="min-h-[44px] min-w-[44px] p-1.5 rounded motion-safe:transition-colors text-danger hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger motion-safe:duration-base" title="Delete" aria-label={`Delete ${member.name}`}><Trash2 size={16} /></button></div></td>
              </tr>
            ))}
            {staff.length === 0 && <tr><td colSpan={9}><AdminHrEmptyState title={debouncedSearch ? 'No staff match the filter' : 'No staff members yet'} description={debouncedSearch ? 'Try changing the search value or clearing filters.' : 'Add your first staff member to begin managing the team.'} /></td></tr>}
          </tbody>
        </table>
      </div>
      <AdminPagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalStaff / HR_ITEMS_PER_PAGE))} totalItems={totalStaff} itemsPerPage={HR_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}

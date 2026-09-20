"use client";
// RESPONSIBILITY: Renders the Admin HR staff ledger using typed query state and accessible table sorting from the ledger hook.
import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { useAdminHrLedgerLogic } from '@/app/admin/hr/hr_context/useAdminHrLedgerLogic';
import { ChevronDown, ChevronUp, ChevronsUpDown, FileText } from 'lucide-react';
import type { AdminHrLedgerSortKey } from '@/app/admin/hr/hr_types/AdminHrTypes';
import AdminHrEmptyState from '@/app/admin/hr/hr_components/AdminHrEmptyState/AdminHrEmptyState';

const LEDGER_COLUMNS: ReadonlyArray<{ key: AdminHrLedgerSortKey | null; label: string }> = [
  { key: 'date', label: 'Date' },
  { key: 'type', label: 'Transaction Type' },
  { key: null, label: 'Notes' },
  { key: 'credit', label: 'Credit (₹)' },
  { key: 'debit', label: 'Debit (₹)' },
  { key: 'balance', label: 'Balance (₹)' },
];

export default function AdminHrLedgerTable() {
  const {
    selectedStaffId,
    setSelectedStaffId,
    selectedStaff,
    staffOptions,
    sortedLedger,
    loading,
    sortKey,
    sortDir,
    handleSort,
  } = useAdminHrLedgerLogic();

  const formatMoney = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-primary">Staff Ledger</h2>
          <p className="text-sm text-secondary">View detailed transaction history for staff members.</p>
        </div>
        <div className="w-full sm:w-64">
          <label className="block text-xs text-secondary mb-1">Select Staff Member</label>
          <AdminSearchableDropdown
            options={staffOptions}
            value={selectedStaffId}
            onChange={(value) => setSelectedStaffId(String(value))}
            placeholder="Select Staff"
            disabled={staffOptions.length === 0}
          />
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Base Salary</p>
            <p className="text-xl font-bold text-primary">{formatMoney(selectedStaff.salary ?? 0)}/mo</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Advance Balance</p>
            <p className="text-xl font-bold text-danger">{formatMoney(selectedStaff.advanceSalary ?? 0)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Due Amount</p>
            <p className="text-xl font-bold text-hr-highlight">{formatMoney(selectedStaff.currentDue ?? 0)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border text-sm">
                {LEDGER_COLUMNS.map((column) => {
                  const active = column.key !== null && sortKey === column.key;
                  return (
                    <th key={column.label} className={`p-4 font-medium text-secondary whitespace-nowrap ${column.key ? 'select-none' : ''} ${column.key === 'balance' ? 'bg-surface-highlight text-right' : ''}`} aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                      {column.key ? (
                        <button type="button" onClick={() => handleSort(column.key as AdminHrLedgerSortKey)} className="inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                          {column.label}
                          {active ? (sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" aria-hidden="true" /> : <ChevronDown size={13} className="text-primary" aria-hidden="true" />) : <ChevronsUpDown size={13} className="text-disabled" aria-hidden="true" />}
                        </button>
                      ) : column.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="text-center p-8 text-secondary">Loading ledger...</td></tr>
              ) : sortedLedger.length === 0 ? (
                <tr><td colSpan={6}><AdminHrEmptyState title="No transactions found" description="This staff member has no ledger transactions for the current view." /></td></tr>
              ) : (
                sortedLedger.map((entry) => (
                  <tr key={entry.id} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                    <td className="p-4 text-primary whitespace-nowrap">{new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="p-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${entry.type.includes('Advance') ? 'bg-danger text-on-primary' : entry.type.includes('Salary Generated') ? 'bg-info text-on-info' : entry.type.includes('Due') ? 'bg-warning text-on-primary' : 'bg-success text-on-primary'}`}>{entry.type}</span></td>
                    <td className="p-4 text-secondary max-w-48 truncate" title={entry.notes}>{displayValue(entry.notes)}</td>
                    <td className="p-4 text-success text-right">{entry.credit ? formatMoney(entry.credit) : '—'}</td>
                    <td className="p-4 text-danger text-right">{entry.debit ? formatMoney(entry.debit) : '—'}</td>
                    <td className="p-4 text-primary font-semibold text-right">{formatMoney(entry.balance)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

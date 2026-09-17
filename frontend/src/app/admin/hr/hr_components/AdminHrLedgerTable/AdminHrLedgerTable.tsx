"use client";
// RESPONSIBILITY: Renders the Admin HR staff ledger using typed query state and accessible table sorting from the ledger hook.
import { displayValue } from '@/app/admin/admin_utils/AdminDisplayValue';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import { useAdminHrLedgerLogic } from '@/app/admin/hr/hr_context/useAdminHrLedgerLogic';
import { ChevronDown, ChevronUp, ChevronsUpDown, FileText } from 'lucide-react';
import type { AdminHrLedgerSortKey } from '@/app/admin/hr/hr_types/AdminHrTypes';

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
          <h2 className="text-lg font-bold text-foreground">Staff Ledger</h2>
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
            <p className="text-xl font-bold text-foreground">{formatMoney(selectedStaff.salary ?? 0)}/mo</p>
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
              <tr className="bg-primary/5 border-b border-border text-sm">
                {LEDGER_COLUMNS.map((column) => {
                  const active = column.key !== null && sortKey === column.key;
                  return (
                    <th key={column.label} className={`p-4 font-medium text-secondary whitespace-nowrap ${column.key ? 'select-none' : ''} ${column.key === 'balance' ? 'bg-primary/5 text-right' : ''}`} aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
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
                <tr><td colSpan={6} className="p-12 text-center text-secondary"><div className="flex flex-col items-center gap-2"><FileText size={32} className="opacity-20" aria-hidden="true" /><p>No transactions found for this staff member.</p></div></td></tr>
              ) : (
                sortedLedger.map((entry) => (
                  <tr key={entry.id} className="hover:bg-secondary/5 motion-safe:transition-colors">
                    <td className="p-4 text-foreground whitespace-nowrap">{new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="p-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${entry.type.includes('Advance') ? 'bg-danger/10 text-danger' : entry.type.includes('Salary Generated') ? 'bg-info-bg text-info' : entry.type.includes('Due') ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>{entry.type}</span></td>
                    <td className="p-4 text-secondary max-w-48 truncate" title={entry.notes}>{displayValue(entry.notes)}</td>
                    <td className="p-4 text-success text-right">{entry.credit ? formatMoney(entry.credit) : '—'}</td>
                    <td className="p-4 text-danger text-right">{entry.debit ? formatMoney(entry.debit) : '—'}</td>
                    <td className="p-4 text-foreground font-semibold text-right">{formatMoney(entry.balance)}</td>
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

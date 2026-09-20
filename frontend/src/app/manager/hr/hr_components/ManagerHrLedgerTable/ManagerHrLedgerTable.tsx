// RESPONSIBILITY: Renders the HR ledger table and exposes feature-owned ledger actions.
'use client';
import { useState, useEffect } from 'react';
import { displayValue, formatCurrencyFromMinorUnits, formatDate } from '@/lib/formatters';
import ManagerHrLedgerEmptyState from '@/app/manager/hr/hr_components/ManagerHrLedgerEmptyState/ManagerHrLedgerEmptyState';
import { useManagerHrLedgerQuery } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLedgerQuery';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';


const HR_LEDGER_COLUMN_COUNT = 6;

export default function ManagerHrLedgerTable() {
  const { staff } = useManagerHrLogic();
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const { data: ledgerResponse, isPending: loading, isError, error } = useManagerHrLedgerQuery(selectedStaffId);
  const ledger = ledgerResponse?.data?.ledger ?? [];

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (staff.length > 0 && !selectedStaffId) {
      if (staff[0]?.id) setSelectedStaffId(staff[0].id);
    }
  }, [staff, selectedStaffId]);


  const selectedStaff = staff.find(s => String(s.id) === String(selectedStaffId));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-primary">Staff Ledger</h2>
          <p className="text-sm text-secondary">View detailed transaction history for staff members.</p>
        </div>
        <div className="w-full sm:w-64">
          <label className="block text-xs text-secondary mb-1">Select Staff Member</label>
          <ManagerSearchableDropdown
            value={selectedStaffId}
            onChange={(value) => setSelectedStaffId(String(value))}
            options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
            placeholder="Select staff"
          />
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Base Salary</p>
            <p className="text-xl font-bold text-primary">{formatCurrencyFromMinorUnits(selectedStaff.salary || 0, ManagerEnvConfig.currencyCode)}/mo</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Advance Balance</p>
            <p className="text-xl font-bold text-danger">{formatCurrencyFromMinorUnits(selectedStaff.advanceSalary || 0, ManagerEnvConfig.currencyCode)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Due Amount</p>
            <p className="text-xl font-bold text-warning">{formatCurrencyFromMinorUnits(selectedStaff.currentDue || 0, ManagerEnvConfig.currencyCode)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-input border-b border-border text-sm">
                <th className="p-4 font-medium text-secondary whitespace-nowrap">Date</th>
                <th className="p-4 font-medium text-secondary whitespace-nowrap">Transaction Type</th>
                <th className="p-4 font-medium text-secondary">Notes</th>
                <th className="p-4 font-medium text-secondary text-right">Credit (₹)</th>
                <th className="p-4 font-medium text-secondary text-right">Debit (₹)</th>
                <th className="p-4 font-medium text-secondary text-right bg-primary-subtle">Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {loading ? (
                Array.from({ length: 5 }, (_, index) => (
                  <tr key={`ledger-loading-${index}`} className="motion-safe:animate-pulse">
                    {Array.from({ length: HR_LEDGER_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`ledger-loading-${index}-${cellIndex}`} className="p-4"><div className="h-4 w-full max-w-32 rounded bg-input" /></td>
                    ))}
                  </tr>
                ))
              ) : isError ? (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-10 text-center text-danger">{error instanceof Error ? error.message : MANAGER_GENERIC_ERROR_MESSAGE}</td></tr>
              ) : ledger.length === 0 ? (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-0"><ManagerHrLedgerEmptyState /></td></tr>
              ) : (
                ledger.map(l => (
                  <tr key={l.id} className="hover:bg-surface-highlight motion-safe:transition-colors">
                    <td className="p-4 text-primary whitespace-nowrap">{formatDate(l.date)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        ${l.type.includes('Advance') ? 'bg-danger text-on-primary' : 
                          l.type.includes('Salary Generated') ? 'bg-info text-on-info' : 
                          l.type.includes('Due') ? 'bg-warning text-on-primary' :
                          'bg-success text-on-primary'}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 text-secondary max-w-50 truncate" title={displayValue(l.notes)}>{displayValue(l.notes)}</td>
                    <td className="p-4 text-right text-success font-medium">{l.credit > 0 ? `+${formatCurrencyFromMinorUnits(l.credit, ManagerEnvConfig.currencyCode)}` : '—'}</td>
                    <td className="p-4 text-right text-danger font-medium">{l.debit > 0 ? `-${formatCurrencyFromMinorUnits(l.debit, ManagerEnvConfig.currencyCode)}` : '—'}</td>
                    <td className="p-4 text-right font-bold text-on-primary bg-primary-subtle">{formatCurrencyFromMinorUnits(l.balance, ManagerEnvConfig.currencyCode)}</td>
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

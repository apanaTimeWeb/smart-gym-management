"use client";
// RESPONSIBILITY: Renders/orchestrates AdminHrLedgerTable for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { displayValue } from '@/app/admin/admin_utils/AdminDisplayValue';
import { useState, useEffect, useMemo } from 'react';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import type { LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { ChevronDown, ChevronUp, ChevronsUpDown, FileText } from 'lucide-react';

export default function AdminHrLedgerTable() {
  const { staff, showToast } = useHrContext();
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  type LedgerSortKey = 'date' | 'type' | 'credit' | 'debit' | 'balance';
  const [sortKey, setSortKey] = useState<LedgerSortKey>('date');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');

  if (staff.length > 0 && !selectedStaffId && staff[0]?.id) {
    setSelectedStaffId(staff[0].id);
  }

  useEffect(() => {
    if (!selectedStaffId) return;
    const fetchLedger = async () => {
      setLoading(true);
      try {
        const res = await hrApi.getLedger(selectedStaffId);
        setLedger(res.data || []);
      } catch (e: unknown) {
        showToast((e as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, [selectedStaffId, showToast]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const selectedStaff = staff.find(s => String(s.id) === String(selectedStaffId));
  const sortedLedger = useMemo(() => [...ledger].sort((a,b)=>{const av=a[sortKey], bv=b[sortKey]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true}); return sortDir==='asc'?result:-result;}),[ledger,sortKey,sortDir]);
  const handleSort=(key:LedgerSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-foreground">Staff Ledger</h2>
          <p className="text-sm text-secondary">View detailed transaction history for staff members.</p>
        </div>
        <div className="w-full sm:w-64">
          <label className="block text-xs text-secondary mb-1">Select Staff Member</label>
          <select 
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground"
          >
            <option value="" disabled>Select Staff</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
            ))}
          </select>
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Base Salary</p>
            <p className="text-xl font-bold text-foreground">{formatMoney(selectedStaff.salary || 0)}/mo</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Advance Balance</p>
            <p className="text-xl font-bold text-danger">{formatMoney(selectedStaff.advanceSalary || 0)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">Due Amount</p>
            <p className="text-xl font-bold text-hr-highlight">{formatMoney(selectedStaff.currentDue || 0)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/10 border-b border-border text-sm">
                {(['date','type','notes','credit','debit','balance'] as const).map((column,index)=>{const keyMap:Array<LedgerSortKey|null>=['date','type',null,'credit','debit','balance'];const key=keyMap[index];const label=['Date','Transaction Type','Notes','Credit (₹)','Debit (₹)','Balance (₹)'][index];return <th key={column} onClick={()=>key&&handleSort(key)} className={`p-4 font-medium text-secondary whitespace-nowrap ${key?'cursor-pointer select-none':''} ${column==='balance'?'bg-primary/5 text-right':''}`} aria-sort={key&&sortKey===key?(sortDir==='asc'?'ascending':'descending'):'none'}><div className={`flex items-center gap-1.5 ${column==='balance'?'justify-end':''}`}>{label}{key&&(sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>)}</div></th>;})}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="text-center p-8 text-secondary">Loading ledger...</td></tr>
              ) : ledger.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-secondary">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={32} className="opacity-20" />
                      <p>No transactions found for this staff member.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedLedger.map(l => (
                  <tr key={l.id} className="hover:bg-secondary/5 motion-safe:transition-colors">
                    <td className="p-4 text-foreground whitespace-nowrap">{new Date(l.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        ${l.type.includes('Advance') ? 'bg-danger/10 text-danger' : 
                          l.type.includes('Salary Generated') ? 'bg-info-bg text-info' : 
                          l.type.includes('Due') ? 'bg-warning/10 text-warning' :
                          'bg-success/10 text-success'}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 text-secondary max-w-48 truncate" title={l.notes}>{displayValue(l.notes)}</td>
                    <td className="p-4 text-right text-success font-medium">{l.credit > 0 ? `+${l.credit.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="p-4 text-right text-danger font-medium">{l.debit > 0 ? `-${l.debit.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="p-4 text-right font-bold text-foreground bg-primary/5">{l.balance.toLocaleString('en-IN')}</td>
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
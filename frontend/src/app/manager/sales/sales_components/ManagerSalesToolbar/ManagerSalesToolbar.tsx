'use client';
// RESPONSIBILITY: Provides the implementation for ManagerSalesToolbar.tsx functionality within its module.
import { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';
import { useSalesContext } from '@/app/manager/sales/sales_context/ManagerSalesContext';
import { ManagerDateFilterDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerDateFilterDropdown';

export default function ManagerSalesToolbar() {
  const { 
    tab, dateFilter, setDateFilter, search, setSearch, setCurrentPage,
    customStartDate, setCustomStartDate, customEndDate, setCustomEndDate,
    overviewData, membershipReport, pendingPayments, allMemberships
  } = useSalesContext();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch, setCurrentPage]);

  return (
  <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-wrap gap-3 items-center justify-between mb-5">
  <div className="flex gap-2 flex-wrap items-center">
    <ManagerDateFilterDropdown />
  </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
  <div className="relative">
    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
    <input 
      value={localSearch} 
      onChange={e => setLocalSearch(e.target.value)} 
      placeholder="Search..." 
      className="pl-9 pr-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm: w-full sm:w-64  bg-input text-foreground"
    />
  </div>
  <button 
    onClick={() => {
      let csv = '';
      let filename = 'sales_report.csv';
      
      if (tab === 'Revenue Overview') {
        csv = 'Month,Revenue\n' + overviewData.map(d => `${d.month},${d.revenue}`).join('\n');
        filename = 'revenue_overview.csv';
      } else if (tab === 'Membership Report') {
        csv = 'Plan,Receivable,Received,Remaining,Refund\n' + membershipReport.map(r => `${r.plan},${r.receivable},${r.received},${r.remaining},${r.refund}`).join('\n');
        filename = 'membership_report.csv';
      } else if (tab === 'Pending Payments') {
        csv = 'Name,Phone,Pending Amount,Days Overdue\n' + pendingPayments.map(p => `${p.name},${p.phone},${p.pendingAmount},${p.daysOverdue}`).join('\n');
        filename = 'pending_payments.csv';
      } else if (tab === 'All Memberships') {
        csv = 'Name,Phone,Plan,Join Date\n' + allMemberships.map(m => `${m.name},${m.phone},${m.planId},${m.joinDate}`).join('\n');
        filename = 'all_memberships.csv';
      }

      if (!csv) {
        alert('No data to export.');
        return;
      }

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }}
    className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
  >
    <Download size={13} /> Export
  </button>
 </div>
 </div>
 );
}


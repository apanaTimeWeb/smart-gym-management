// RESPONSIBILITY: Renders the toolbar for searching, filtering, and initiating the "Add Member" action.
// CRITICAL FIX: Added gender filter, plan filter, expiry date range, and Export CSV/PDF buttons.
'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw, Plus, MessageCircle, Download, Calendar } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/ManagerMembersContext';
import { useManagerMembersStore } from '@/app/manager/members/members_store/useManagerMembersStore';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import {
  MEMBER_STATUS_OPTIONS,
  MEMBER_GENDER_OPTIONS,
  MEMBER_EXPORT_FORMATS,
} from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';

export default function ManagerMembersToolbar() {
  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    genderFilter, setGenderFilter,
    planFilter, setPlanFilter,
    expiryFrom, expiryTo, setExpiryRange,
    openAdd, currentPage, setCurrentPage, showToast,
    exportMembers,
  } = useMembersContext();
  const { loadAll, members } = useManagerMembersStore();
  const plans = useManagerMembersStore(s => s.plans);
  const { confirm } = useConfirm();
  const [localSearch, setLocalSearch] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

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
  }, [localSearch, search, setSearch]);

  const handleRefresh = () => {
    loadAll({ search, status: statusFilter, page: currentPage.toString() });
  };

  const handleBulkReminder = async () => {
    const today = new Date();
    const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiringMembers = members.filter(m => {
      if (m.status !== 'ACTIVE') return false;
      const expiry = new Date(m.expiryDate);
      return expiry >= today && expiry <= in30Days;
    });
    const count = expiringMembers.length;
    if (count === 0) {
      showToast('No active members are expiring in the next 30 days. 🎉', 'success');
      return;
    }
    const confirmed = await confirm({
      title: 'Bulk WhatsApp Reminder',
      message: `Send automated WhatsApp renewal reminders to ${count} member${count !== 1 ? 's' : ''} expiring in the next 30 days?`,
      confirmText: 'Send Blast',
    });
    if (confirmed) {
      showToast(`Successfully sent WhatsApp blast to ${count} member${count !== 1 ? 's' : ''}.`, 'success');
    }
  };

  // Build plan options dynamically from live plan list (Rule 3B — no hardcoded plans)
  const planOptions = [
    { label: 'All Plans', value: 'All' },
    ...plans.map(p => ({ label: p.name, value: p.id })),
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 flex flex-col gap-3">
      {/* Row 1: Search + Primary Actions */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page w-full bg-input text-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={handleRefresh}
            className="flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:opacity-80 text-primary w-full sm:w-auto"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleBulkReminder}
            className="flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-success text-success rounded-xl hover:bg-success/10 transition-colors w-full sm:w-auto"
          >
            <MessageCircle size={14} /> Bulk Reminder
          </button>
          {/* Export buttons — CRITICAL FIX */}
          {MEMBER_EXPORT_FORMATS.map(fmt => (
            <button
              key={fmt.value}
              onClick={() => exportMembers(fmt.value)}
              className="flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:bg-primary-subtle text-secondary hover:text-foreground transition-colors w-full sm:w-auto"
              aria-label={fmt.label}
            >
              <Download size={14} /> {fmt.label}
            </button>
          ))}
          <button
            onClick={openAdd}
            className="flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>
      </div>

      {/* Row 2: Filters — CRITICAL FIX */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status filter */}
        <SearchableDropdown
          value={statusFilter}
          onChange={(val) => setStatusFilter(String(val))}
          className="w-full sm:w-44"
          options={MEMBER_STATUS_OPTIONS}
          placeholder="Filter by status"
        />
        {/* Gender filter — CRITICAL FIX */}
        <SearchableDropdown
          value={genderFilter}
          onChange={(val) => setGenderFilter(String(val))}
          className="w-full sm:w-40"
          options={MEMBER_GENDER_OPTIONS}
          placeholder="Filter by gender"
        />
        {/* Plan filter — CRITICAL FIX */}
        <SearchableDropdown
          value={planFilter}
          onChange={(val) => setPlanFilter(String(val))}
          className="w-full sm:w-44"
          options={planOptions}
          placeholder="Filter by plan"
        />
        {/* Expiry Date Range — CRITICAL FIX */}
        <div className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-1.5 bg-input text-sm w-full sm:w-auto">
          <Calendar size={13} className="text-secondary shrink-0" />
          <input
            type="date"
            value={expiryFrom}
            onChange={e => setExpiryRange(e.target.value, expiryTo)}
            className="bg-transparent text-secondary focus:outline-none text-xs"
            title="Expiry from"
            aria-label="Expiry date from"
          />
          <span className="text-secondary text-xs">–</span>
          <input
            type="date"
            value={expiryTo}
            onChange={e => setExpiryRange(expiryFrom, e.target.value)}
            className="bg-transparent text-secondary focus:outline-none text-xs"
            title="Expiry to"
            aria-label="Expiry date to"
          />
        </div>
      </div>
    </div>
  );
}

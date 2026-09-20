'use client';
// RESPONSIBILITY: Renders the search/filter toolbar and bulk-action bar for the Inquiries module.
import { useState, useEffect } from 'react';
import { useManagerInquiriesLogic } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import { INQUIRIES_STATUS_LABELS } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';
import { RefreshCw, Plus, MessageCircle, Mail } from 'lucide-react';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';

import { useQueryClient } from '@tanstack/react-query';

export default function ManagerInquiriesToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, openAdd, selectedIds, clearSelection, openBulkMsg, setCurrentPage } = useManagerInquiriesLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);
  const queryClient = useQueryClient();

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

  if (selectedIds.length > 0) {
    return (
      <div className="bg-primary-subtle border border-primary/30 rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between motion-safe:transition-all">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-primary">
            {selectedIds.length} {selectedIds.length === 1 ? 'inquiry' : 'inquiries'} selected
          </span>
          <button onClick={clearSelection} className="text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors">
            Clear Selection
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => openBulkMsg('whatsapp')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl bg-success hover:opacity-90 motion-safe:transition-opacity"
          >
            <MessageCircle size={18} /> Bulk WhatsApp
          </button>
          <button
            onClick={() => openBulkMsg('email')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-info rounded-xl bg-info hover:opacity-90 motion-safe:transition-opacity"
          >
            <Mail size={18} /> Bulk Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-center justify-between">
      <input
        value={localSearch}
        onChange={e => setLocalSearch(e.target.value)}
        placeholder="Search name or phone..."
        className="border border-border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page  w-full sm:w-64  bg-input text-primary"
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="w-48">
          <ManagerSearchableDropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(String(val))}
            options={[
              { label: 'All Status', value: 'All' },
              ...Object.entries(INQUIRIES_STATUS_LABELS)
                .filter(([val]) => val !== 'CONVERTED')
                .map(([val, label]) => ({ label, value: val })),
            ]}
          />
        </div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['manager', 'inquiries'] })}
          className="flex items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:opacity-80 motion-safe:transition-opacity text-secondary"
          aria-label="Refresh inquiries"
        >
          <RefreshCw size={18} />
        </button>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-primary bg-primary rounded-xl hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95"
        >
          <Plus size={18} /> Add Inquiry
        </button>
      </div>
    </div>
  );
}

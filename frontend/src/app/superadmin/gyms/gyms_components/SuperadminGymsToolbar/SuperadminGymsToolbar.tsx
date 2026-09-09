'use client';
// RESPONSIBILITY: Renders the search toolbar for the Gyms table.

import React from 'react';
import { Search, Download } from 'lucide-react';

import { useSuperadminGymsToolbar } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsToolbar/useSuperadminGymsToolbar';

export default function SuperadminGymsToolbar() {
  const { search, handleSearchChange, statusFilter, setStatusFilter, planFilter, setPlanFilter, handleExportGyms } = useSuperadminGymsToolbar();

  return (
    <div className="p-4 border-b border-border flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-disabled" />
        <input 
          type="text" 
          placeholder="Search gyms by name or owner..." 
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-card border border-border text-foreground rounded-lg pl-10 pr-4 py-2 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
          aria-label="Search gyms"
        />
      </div>
      <select 
        value={statusFilter} 
        onChange={e => setStatusFilter(e.target.value)} 
        className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-foreground"
      >
        <option value="All">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="SUSPENDED">Suspended</option>
        <option value="TRIAL">Trial</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <select 
        value={planFilter} 
        onChange={e => setPlanFilter(e.target.value)} 
        className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-foreground"
      >
        <option value="All">All Plans</option>
        <option value="STARTER">Starter</option>
        <option value="PRO">Pro</option>
        <option value="ENTERPRISE">Enterprise</option>
      </select>
      <button
        onClick={handleExportGyms}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-card hover:bg-input motion-safe:transition-colors"
        title="Export Gyms as CSV"
      >
        <Download size={16} /> Export
      </button>
    </div>
  );
}

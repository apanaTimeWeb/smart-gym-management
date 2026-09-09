'use client';
// RESPONSIBILITY: Renders the page title, search, status filter, date-range filter, and Add CTA for the Affiliates page.
// Receives all state via props — no API calls.
import { Users, Plus, Search } from 'lucide-react';

interface AffiliatesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE';
  onStatusFilterChange: (value: 'ALL' | 'ACTIVE' | 'INACTIVE') => void;
  onAddClick: () => void;
  /** ISO date string for commission period start filter */
  startDate: string;
  onStartDateChange: (value: string) => void;
  /** ISO date string for commission period end filter */
  endDate: string;
  onEndDateChange: (value: string) => void;
}

export default function SuperadminAffiliatesHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddClick,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: AffiliatesHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Affiliate Partners
          </h1>
          <p className="text-sm text-secondary mt-1">Manage partners and resellers referring tenants to the platform.</p>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out motion-safe:active:scale-95 text-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Affiliate
        </button>
      </div>

      {/* Filters row — Rule 64: flex-col sm:flex-row so they stack on mobile */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search affiliates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary motion-safe:transition-colors w-full sm:w-56"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
          className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary motion-safe:transition-colors"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {/* Date-range filter for commission period (audit item #28) */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-start-date">From:</label>
          <input
            id="aff-start-date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
            aria-label="Commission period start date"
          />
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-end-date">To:</label>
          <input
            id="aff-end-date"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
            aria-label="Commission period end date"
          />
        </div>
      </div>
    </div>
  );
}

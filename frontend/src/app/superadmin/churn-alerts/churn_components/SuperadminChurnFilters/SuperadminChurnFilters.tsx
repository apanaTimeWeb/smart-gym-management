'use client';
// RESPONSIBILITY: Filter bar for the Churn Alerts table.
// Emits filter changes to parent via callbacks — owns no state.

import { Search } from 'lucide-react';
import type { ChurnFilterStatus } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

const FILTER_OPTIONS: { label: string; value: ChurnFilterStatus }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Critical', value: 'CRITICAL' },
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Resolved', value: 'RESOLVED' },
];

interface SuperadminChurnFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  activeFilter: ChurnFilterStatus;
  onFilterChange: (v: ChurnFilterStatus) => void;
}

export default function SuperadminChurnFilters({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: SuperadminChurnFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-border">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder="Search gym or owner..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeFilter === opt.value
                ? 'bg-primary text-black'
                : 'bg-input text-secondary hover:text-foreground hover:bg-card border border-border'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

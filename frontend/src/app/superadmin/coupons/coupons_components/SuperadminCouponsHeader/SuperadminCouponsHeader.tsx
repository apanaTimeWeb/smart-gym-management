'use client';
// RESPONSIBILITY: Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props — no API calls.
import { Tag, Plus, Search, Filter } from 'lucide-react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

interface CouponsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
}

export default function SuperadminCouponsHeader({ searchQuery, onSearchChange, onCreateClick, statusFilter, onStatusFilterChange }: CouponsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Tag className="w-6 h-6 text-primary" />
          Promotional Coupons
        </h1>
        <p className="text-sm text-secondary mt-1">Manage global discount codes for new SaaS subscriptions.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary motion-safe:transition-colors w-full sm:w-64"
          />
        </div>
        
        {onStatusFilterChange && (
          <div className="w-40 border-none bg-input rounded-lg">
            <SearchableDropdown
              options={STATUS_OPTIONS}
              value={statusFilter || 'ALL'}
              onChange={(val) => onStatusFilterChange(String(val))}
              className="bg-transparent border-border"
            />
          </div>
        )}

        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out motion-safe:active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>
    </div>
  );
}

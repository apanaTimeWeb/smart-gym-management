'use client';
// RESPONSIBILITY: Renders the page title, search input, and "Add Affiliate" CTA button for the Affiliates page. Receives all state via props — no API calls.
import { Users, Plus, Search } from 'lucide-react';
interface AffiliatesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export default function AffiliatesHeader({ searchQuery, onSearchChange, onAddClick }: AffiliatesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Affiliate Partners
        </h1>
        <p className="text-sm text-secondary mt-1">Manage partners and resellers referring tenants to the platform.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search affiliates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
          />
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all duration-200 ease-in-out active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Affiliate
        </button>
      </div>
    </div>
  );
}

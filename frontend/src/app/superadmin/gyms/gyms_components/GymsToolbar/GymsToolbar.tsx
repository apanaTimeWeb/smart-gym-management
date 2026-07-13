// RESPONSIBILITY: Renders the search toolbar for the Gyms table.
'use client';

import React from 'react';
import { Search } from 'lucide-react';

import { useGymsToolbar } from '@/app/superadmin/gyms/gyms_components/GymsToolbar/useGymsToolbar';

export default function GymsToolbar() {
  const { search, handleSearchChange } = useGymsToolbar();

  return (
    <div className="p-4 border-b border-border flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-disabled" />
        <input 
          type="text" 
          placeholder="Search gyms by name or owner..." 
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-card border border-border text-foreground rounded-lg pl-10 pr-4 py-2 transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
          aria-label="Search gyms"
        />
      </div>
    </div>
  );
}

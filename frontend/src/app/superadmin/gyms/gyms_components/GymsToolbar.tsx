// RESPONSIBILITY: GymsToolbar.tsx handles the logic and UI for its corresponding feature.
'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useGymsContext } from '@/app/superadmin/gyms/gyms_context/GymsContext';

export default function GymsToolbar() {
  const { search, setSearch } = useGymsContext();

  return (
    <div className="p-4 border-b border-border flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-disabled" />
        <input 
          type="text" 
          placeholder="Search gyms by name or owner..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border text-foreground rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all"
        />
      </div>
    </div>
  );
}

"use client";
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.
// RESPONSIBILITY: Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';
import { useAdminMembersHeaderSearch } from '@/app/admin/members/members_components/AdminMembersHeaderSearch/useAdminMembersHeaderSearch';

export function AdminMembersHeaderSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // RATIONALE: Required by architecture to sync state/lifecycle based on dependencies.
// EFFECT: Synchronizes this component effect with its declared React dependencies in members/members_components/AdminMembersHeaderSearch/AdminMembersHeaderSearch.tsx.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setShowSearch(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: searchResults = [] } = useAdminMembersHeaderSearch(searchQuery);

  return (
    <div className="relative hidden md:block" ref={searchRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={15} className="text-secondary" />
      </div>
      <input
        type="text"
        placeholder="Search members..."
        className="w-56 pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
        onFocus={() => setShowSearch(true)}
        aria-label="Search members globally"
      />
      {showSearch && searchQuery && (
        <div className="absolute top-full mt-2 w-72 bg-popover border border-border rounded-xl shadow-popover z-30 overflow-hidden">
          <div className="flex justify-between items-center px-3 py-2 border-b border-border">
            <p className="text-xs text-secondary uppercase font-bold tracking-wider">
              {searchResults.length > 0 ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''}` : 'No results'}
            </p>
            <button onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label="Clear search">
              <X size={13} />
            </button>
          </div>
          {searchResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-secondary">No members found for &quot;{searchQuery}&quot;</div>
          ) : (
            <>
              {searchResults.map((m) => (
                <Link
                  key={m.id}
                  href={AdminMembersUrlConfig.detail(m.id)}
                  onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-input motion-safe:transition-colors border-b border-border last:border-0 motion-safe:duration-base"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">{m.name}</p>
                      <p className="text-xs text-secondary truncate">{m.branchName}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={AdminMembersUrlConfig.root}
                onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                className="block px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-input motion-safe:transition-colors border-t border-border motion-safe:duration-base"
              >
                View all members →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

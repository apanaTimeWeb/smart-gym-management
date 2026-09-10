'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { STATUS_STYLES } from '@/app/admin/admin_url_config';
import { useQuery } from '@tanstack/react-query';
import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

export function AdminHeaderSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: membersData } = useQuery({
    queryKey: ['adminMembers'],
    queryFn: () => apiFetch<{ data: AdminMember[] }>('/api/admin/members/list').then(r => r.data || []),
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const membersList = membersData || [];
    return membersList.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.email.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery, membersData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setShowSearch(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative hidden md:block" ref={searchRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={15} className="text-secondary" />
      </div>
      <input
        type="text"
        placeholder="Search members..."
        className="w-56 pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground placeholder:text-secondary"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
        onFocus={() => setShowSearch(true)}
        aria-label="Search members globally"
      />
      {showSearch && searchQuery && (
        <div className="absolute top-full mt-2 w-72 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex justify-between items-center px-3 py-2 border-b border-border">
            <p className="text-xs text-secondary uppercase font-bold tracking-wider">
              {searchResults.length > 0 ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''}` : 'No results'}
            </p>
            <button onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="text-secondary hover:text-foreground" aria-label="Clear search">
              <X size={13} />
            </button>
          </div>
          {searchResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-secondary">No members found for "{searchQuery}"</div>
          ) : (
            <>
              {searchResults.map((m) => (
                <Link
                  key={m.id}
                  href="/admin/members"
                  onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-input motion-safe:transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
                      <p className="text-xs text-secondary truncate">{m.branchName}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 ${STATUS_STYLES[m.status] ?? 'text-secondary bg-input border-border'}`}>
                    {m.status}
                  </span>
                </Link>
              ))}
              <Link
                href="/admin/members"
                onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                className="block px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-input motion-safe:transition-colors border-t border-border"
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

"use client";
// RESPONSIBILITY: Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useTranslations } from 'next-intl';
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/admin_members_url_config';
import { useAdminMembersHeaderSearch } from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_header_search/useAdminMembersHeaderSearch';

/**
 * AdminMembersHeaderSearch renders the admin members header search UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersHeaderSearch: Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
 * @dependencies Consumes admin_members_url_config, useAdminMembersHeaderSearch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminMembersHeaderSearch() {
  const t = useTranslations();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // RATIONALE: Required by architecture to sync state/lifecycle based on dependencies.
// EFFECT: Synchronizes this component effect with its declared React dependencies in members/admin_members_components/admin_members_header_search/AdminMembersHeaderSearch.tsx.
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
        <Search size={18} className="text-secondary"  strokeWidth={2}/>
      </div>
      <input
        type="text"
        placeholder={t('members.admin_members_header_search.text_c698311c9b')}
        className="w-56 pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
        onFocus={() => setShowSearch(true)}
        aria-label={t('members.admin_members_header_search.text_84abda0656')}
       data-testid="admin_members-admin_members-header-search-search"/>
      {showSearch && searchQuery && (
        <div className="absolute top-full mt-2 w-72 bg-popover border border-border rounded-xl shadow-popover z-30 overflow-hidden">
          <div className="flex justify-between items-center px-3 py-2 border-b border-border">
            <p className="text-xs text-secondary uppercase font-bold tracking-wider">
              {searchResults.length > 0 ? t('members.admin_members_header_search.resultsCount', { count: searchResults.length }) : t('members.admin_members_header_search.auto_6fee0f145a')}
            </p>
            <button type="button" onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('members.admin_members_header_search.text_67300d0fed')} data-testid="admin_members-admin_members-header-search-search-2">
              <X size={18}  strokeWidth={2}/>
            </button>
          </div>
          {searchResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-secondary">{t('members.admin_members_header_search.text_1333fd5129')}{searchQuery}{t('members.admin_members_header_search.text_e2bbf209ae')}</div>
          ) : (
            <>
              {searchResults.map((m , __testIdIndex65) => (
                <Link
                  key={m.id}
                  href={ADMIN_MEMBERS_ROUTES.detail(m.id)}
                  onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-input motion-safe:transition-colors border-b border-border last:border-0 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                 data-testid={`admin_members-admin_members-header-search-search-3-map65-${__testIdIndex65}-1`}>
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
                href={ADMIN_MEMBERS_ROUTES.root}
                onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                className="block px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-input motion-safe:transition-colors border-t border-border motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
               data-testid="admin_members-admin_members-header-search-search-4">
                {t('members.admin_members_header_search.text_bf33f2c023')}</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
// RESPONSIBILITY: Renders the collapsible left navigation sidebar for the Trainer portal. No API calls.
import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { getUser } from '@/lib/api';
import { TRAINER_NAV_GROUPS } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { useTrainerNavigationGuardStore } from '@/app/trainer/trainer_utils/TrainerNavigationGuardStore';

import type { TrainerSidebarProps } from '@/app/trainer/trainer_components/TrainerLayout/TrainerLayoutTypes';

export default function TrainerSidebar({ isCollapsed, setIsCollapsed }: TrainerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { confirm } = useConfirm();
  const hasDirtySources = useTrainerNavigationGuardStore((state) => state.hasDirtySources());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = getUser();

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Listens for the global 'toggle-sidebar' event dispatched by TrainerHeader's hamburger button.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen(v => !v);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Filter groups based on search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return TRAINER_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    
    return TRAINER_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.label.toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-overlay/80 backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full bg-sidebar border-r border-border z-20 flex flex-col motion-safe:transition-all motion-safe:duration-slow ${
        isCollapsed ? 'lg:w-15' : 'lg:w-60'
      } ${
        isMobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0'
      }`}>

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt="GymSmart TRAINER" width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-base flex flex-col">
                <span className="text-foreground font-bold text-lg leading-tight tracking-tight">GymSmart</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5">TRAINER App</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-input text-foreground placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm motion-safe:transition-colors"
              />
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Search menu"
              className="p-2 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search size={18} />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {filteredNavGroups.length === 0 ? (
            <div className="text-center py-4 text-sm text-secondary">
              No matches found
            </div>
          ) : (
            filteredNavGroups.map((group) => (
              <div key={group.group}>
                {(!isCollapsed || isMobileOpen) && (
                  <p className="text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider">
                    {group.group}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href || ((item.href as string) !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    const showLabel = !isCollapsed || isMobileOpen;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!showLabel ? item.label : ''}
                        onClick={(event) => {
                          if (!hasDirtySources || pathname === item.href) return;
                          event.preventDefault();
                          void confirm({
                            title: 'Unsaved changes',
                            message: 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
                            confirmText: 'Leave',
                            cancelText: 'Stay',
                            type: 'warning',
                          }).then((approved) => {
                            if (approved) router.push(item.href);
                          });
                        }}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer ${
                          !showLabel ? 'justify-center px-0' : 'px-3.5'
                        } ${
                          active
                            ? 'bg-primary-subtle text-primary border-l-2 border-primary'
                            : 'text-secondary hover:text-primary hover:bg-primary-subtle border-l-2 border-transparent'
                        }`}
                        
                      >
                        <Icon size={18} strokeWidth={2} className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'} />
                        {showLabel && <span className="text-sm whitespace-nowrap">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </nav>

        {/* User */}
        <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${(!isCollapsed || isMobileOpen) ? 'gap-3' : 'justify-center'}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/10 bg-primary">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'T') : 'T'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="whitespace-nowrap overflow-hidden flex-1">
              <div className="text-foreground text-sm font-bold truncate">{mounted ? (user?.name || 'Trainer User') : 'Trainer User'}</div>
              <div className="text-secondary text-xs truncate">{mounted ? (user?.role || 'Personal Trainer') : 'Personal Trainer'}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

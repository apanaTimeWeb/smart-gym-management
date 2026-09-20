// RESPONSIBILITY: SuperadminSidebar.tsx renders the collapsible sidebar navigation for the SaaS Master Control Panel.
'use client';
// Active state: gold left border + bg-primary-subtle + gold glow (Design §3).
// Sidebar footer: logout button per standard ERP shell layout.
// Includes a local search filter for quick navigation.
import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Gauge, LogOut, Search } from 'lucide-react';
import { SuperadminNavigationConfig } from '@/app/superadmin/superadmin_layout/SuperadminLayout/superadmin_navigation_config';
import { logout } from '@/lib/api';
import SuperadminSidebarNavSection from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebarNavSection';
import type { SuperadminSidebarProps } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebarTypes';

const ALL_NAV_GROUPS = SuperadminNavigationConfig;
export default function SuperadminSidebar({ isCollapsed, setIsCollapsed }: SuperadminSidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // Listens for the global 'toggle-sidebar' event dispatched by SuperadminHeader's hamburger button.
// EFFECT INTENT: registers/removes a browser event listener and keeps the listener aligned with its captured values.
    useEffect(() => {
        const handleToggle = () => {
            if (window.innerWidth < 1024) {
                setIsMobileOpen(v => !v);
            }
            else {
                setIsCollapsed(!isCollapsed);
            }
        };
        window.addEventListener('toggle-sidebar', handleToggle);
        return () => window.removeEventListener('toggle-sidebar', handleToggle);
    }, [isCollapsed, setIsCollapsed]);
    // Closes the mobile drawer whenever the route changes to avoid stale open state.
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        Promise.resolve().then(() => setIsMobileOpen(false));
    }, []);
    const filteredNavGroups = useMemo(() => {
        if (!searchQuery.trim())
            return ALL_NAV_GROUPS;
        const lowerQuery = searchQuery.toLowerCase();
        return ALL_NAV_GROUPS
            .map(group => ({
            ...group,
            items: group.items.filter(item => item.name.toLowerCase().includes(lowerQuery))
        }))
            .filter(group => group.items.length > 0);
    }, [searchQuery]);
    async function handleLogout() {
        await logout();
    }
    return (<>
      {/* Mobile Backdrop — closes sidebar when tapping outside */}
      {isMobileOpen && (<div className="fixed inset-0 bg-overlay/90 backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity" onClick={() => setIsMobileOpen(false)} aria-hidden="true"/>)}

      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar border-r border-border motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'lg:w-16' : 'lg:w-60'} ${isMobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full lg:translate-x-0'}`}>
        {/* Logo / Branding Header */}
        <div className="flex h-20 items-center justify-between px-4 border-b border-border shrink-0">
          {!isCollapsed && (<div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Gauge className="w-5 h-5 text-on-danger"/>
              </div>
              <div>
                <span className="text-base font-bold text-on-danger leading-tight block">GymSmart 360</span>
                <span className="text-xs text-secondary leading-none">SuperAdmin</span>
              </div>
            </div>)}
          {isCollapsed && (<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <Gauge className="w-5 h-5 text-on-danger"/>
            </div>)}
        </div>

        {/* Collapse Toggle Button */}
        <div className="hidden lg:flex items-center justify-end px-4 py-2 border-b border-border">
          <button onClick={() => setIsCollapsed(!isCollapsed)} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="p-1.5 rounded-lg text-secondary hover:text-on-danger hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {isCollapsed ? <ChevronRight className="w-4 h-4"/> : <ChevronLeft className="w-4 h-4"/>}
          </button>
        </div>

        {/* Search Box */}
        {!isCollapsed ? (<div className="px-4 py-3 border-b border-border shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-secondary"/>
              </div>
              <input type="text" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-input text-on-danger placeholder-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary sm:text-sm motion-safe:transition-colors"/>
            </div>
          </div>) : (<div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button onClick={() => setIsCollapsed(false)} aria-label="Search menu" className="p-2 rounded-lg text-secondary hover:text-on-danger hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Search size={18}/>
            </button>
          </div>)}

        {/* Navigation Groups */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-3 custom-scrollbar" aria-label="Sidebar navigation">
          <SuperadminSidebarNavSection navGroups={filteredNavGroups} isCollapsed={isCollapsed}/>
        </nav>

        {/* Sidebar Footer — Logout */}
        <div className="shrink-0 border-t border-border p-3">
          <button onClick={handleLogout} aria-label="Logout from SaaS Panel" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-on-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={2}/>
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>);
}

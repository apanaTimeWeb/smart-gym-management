// RESPONSIBILITY: SuperadminHeader.tsx renders the top navigation bar for the SaaS module.
'use client';
// Applies glassmorphism per Design §12.2 (bg-card/80 backdrop-blur-md).
// Handles theme toggling and profile dropdown actions. No business logic or API calls.
import { useState, useRef, useEffect } from 'react';
import { LogOut, Settings, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { logout } from '@/lib/api';
import SuperadminMessagingNotificationBell from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell';
export default function SuperadminHeader() {
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    // Sets mounted=true once on client-side hydration to enable ThemeToggle to render safely without SSR mismatch.
    // Dependency: [] — runs once on mount only.
// EFFECT INTENT: registers/removes a browser event listener and keeps the listener aligned with its captured values.
    useEffect(() => {
        Promise.resolve().then(() => setMounted(true));
    }, []);
    // Closes profile dropdown when clicking anywhere outside the profile ref container.
    // Dependency: [] — event listener is set once on mount, no dynamic deps.
// EFFECT INTENT: registers/removes a browser event listener and keeps the listener aligned with its captured values.
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    function handleToggleSidebar() {
        window.dispatchEvent(new Event('toggle-sidebar'));
    }
    function handleToggleProfile() {
        setShowProfile(prev => !prev);
    }
    function handleCloseProfile() {
        setShowProfile(false);
    }
    async function handleLogout() {
        handleCloseProfile();
        await logout();
    }
    return (
    // Design §12.2: Sticky headers use translucent bg + backdrop-blur for glassmorphism depth
    <header className="bg-card/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex flex-wrap items-center gap-4">
        <button className="lg:hidden p-2 -ml-3 text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-page rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={handleToggleSidebar} aria-label="Toggle Sidebar" title="Toggle Sidebar">
          <Menu size={18}/>
        </button>
        <div>
          <h1 className="text-xl font-bold text-primary">SaaS Platform</h1>
          <p className="text-sm text-secondary mt-0.5">Master Control Panel</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Notification Bell */}
        {mounted && <SuperadminMessagingNotificationBell />}

        {/* Theme Toggle - accessible dark/light mode switcher */}
        {mounted && <ThemeToggle />}

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={handleToggleProfile} aria-label="Open profile menu" aria-expanded={showProfile} className="w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 shadow-card bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            SA
          </button>

          {showProfile && (<div role="menu" aria-label="Profile menu" className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30 motion-safe:animate-superadmin-fade-in-up">
              <div className="px-4 py-3 border-b border-border bg-header">
                <p className="text-sm font-semibold text-primary">Superadmin</p>
                <p className="text-xs text-secondary">admin@gymsmart.com</p>
                <p className="text-xs text-warning font-medium mt-0.5">GOD MODE</p>
              </div>
              <div className="py-1">
                <Link href={SettingsUrlConfig.PAGES.MAIN} role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-input" onClick={handleCloseProfile}>
                  <Settings className="w-4 h-4"/> Platform Settings
                </Link>
              </div>
              <div className="border-t border-border py-1 bg-header">
                <button role="menuitem" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-danger-bg" onClick={handleLogout}>
                  <LogOut className="w-4 h-4"/> Exit SaaS Panel
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </header>);
}

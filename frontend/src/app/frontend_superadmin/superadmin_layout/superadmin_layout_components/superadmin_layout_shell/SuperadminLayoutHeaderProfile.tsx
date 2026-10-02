'use client';
/**
 * RESPONSIBILITY: React component SuperadminLayoutHeaderProfile owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState, useEffect
 * MODULE DEPENDENCIES: lucide-react, next/link, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders/orchestrates SuperadminLayoutHeaderProfile for the superadmin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUser, logout } from '@/lib/api';

import { MODULE_URLS as SUPERADMIN_PROFILE_URLS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';



/**
 * Responsibility: Renders the SuperadminLayoutHeaderProfile UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminLayoutHeaderProfile() {
  const t = useTranslations('SuperadminLayoutStyles');
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  // eslint-disable-next-line react-hooks/set-state-in-effect
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminLayoutStyles/SuperadminLayout/SuperadminLayoutHeaderProfile.tsx.
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="min-h-11 min-w-11 w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label={t('ui.profile_menu_36eb56ac')}
       data-testid="SuperadminLayoutStyles-superadmin-header-profile-header-profile-profile-menu">
        {mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}
      </button>
      {showProfile && (
        <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-primary">{mounted ? (user?.name ?? 'Superadmin') : 'Superadmin'}</p>
            <p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>
            {mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
          </div>
          <div className="py-1">
            <Link href={SUPERADMIN_PROFILE_URLS.PAGES.MAIN} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base" onClick={() => setShowProfile(false)} data-testid="SuperadminLayoutStyles-superadmin-header-profile-header-profile-my-profile">
              <User size={18} /> {t('ui.my_profile_e8956174')}</Link>
          </div>
          <div className="border-t border-border py-1">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => { setShowProfile(false); logout(); }} data-testid="SuperadminLayoutStyles-superadmin-header-profile-header-profile-log-out">
              <LogOut size={18} /> {t('ui.log_out_4394c8d8')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

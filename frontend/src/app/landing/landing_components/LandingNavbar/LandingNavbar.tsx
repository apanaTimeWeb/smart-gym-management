'use client';
// RESPONSIBILITY: Renders accessible desktop and mobile navigation for the Landing page; no business/API logic.
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { LANDING_MOBILE_NAVIGATION_LINKS, LANDING_NAVIGATION_LINKS } from '@/app/landing/landing_utils/LandingSharedConstants';
import { useLandingNavbar } from '@/app/landing/landing_components/LandingNavbar/useLandingNavbar';

export default function LandingNavbar() {
  const { menuOpen, scrolled, menuPanelRef, closeMenu, toggleMenu, handleMenuKeyDown } = useLandingNavbar();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-20 motion-safe:transition-all motion-safe:duration-base ease-in-out ${scrolled ? 'landing-navbar--scrolled' : 'bg-header'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between min-h-16">
        <Link href={LandingUrlConfig.ANCHORS.HOME} className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-lg">
          <Image src="/logo.png" alt="GymSmart" width={40} height={40} priority className="rounded-lg object-cover" />
          <div>
            <span className="font-bold text-lg text-primary tracking-tight">GymSmart</span>
            <span className="text-xs text-warning block -mt-1 tracking-widest uppercase">Fitness ERP</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-secondary">
          {LANDING_NAVIGATION_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-md motion-safe:transition-colors motion-safe:duration-base"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href={LandingUrlConfig.PAGES.SAAS_LOGIN} className="text-sm font-medium text-warning hover:text-primary px-3 py-1.5 border border-border rounded-lg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            Superadmin Login
          </Link>
          <Link href={LandingUrlConfig.PAGES.ERP_LOGIN} className="text-sm font-medium text-secondary hover:text-primary px-3 py-1.5 motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-lg">
            ERP Login
          </Link>
          <Link href={LandingUrlConfig.ANCHORS.BOOKING} className="text-sm font-bold px-5 py-2.5 rounded-xl bg-primary text-on-primary motion-safe:transition-all motion-safe:duration-base hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            Join Now
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden min-w-11 min-h-11 p-2 text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-lg"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-navigation"
        >
          {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuPanelRef}
          id="landing-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Landing navigation"
          onKeyDown={handleMenuKeyDown}
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-30 bg-overlay border-t border-border px-4 py-4 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            {LANDING_MOBILE_NAVIGATION_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="block min-h-11 px-3 py-3 text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-lg motion-safe:transition-colors motion-safe:duration-base"
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 flex-col">
              <Link href={LandingUrlConfig.PAGES.SAAS_LOGIN} onClick={closeMenu} className="w-full min-h-11 flex items-center justify-center border border-focus text-warning rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                Superadmin Login
              </Link>
              <Link href={LandingUrlConfig.PAGES.ERP_LOGIN} onClick={closeMenu} className="w-full min-h-11 flex items-center justify-center border border-border rounded-xl text-sm font-medium text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                ERP Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="md:hidden fixed inset-0 z-20 bg-transparent cursor-default"
          tabIndex={-1}
        />
      )}
    </nav>
  );
}

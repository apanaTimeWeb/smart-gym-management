"use client";
// RESPONSIBILITY: Renders the single persistent fixed Superadmin shell header. It owns shell controls only; feature business logic stays inside feature modules.

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SuperadminHeaderProfile } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminHeaderProfile';

import { getSuperadminRouteHeaderConfig } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminRouteHeaderConfig';

export default function SuperadminHeader() {
  const pathname = usePathname();
  const { title, subtitle } = getSuperadminRouteHeaderConfig(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 bg-header backdrop-blur border-b border-border px-6 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-surface-hover rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-primary truncate">{title}</h1>
          {subtitle ? <p className="text-sm text-secondary truncate mt-0.5">{subtitle}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        <ThemeToggle />
        <SuperadminHeaderProfile />
      </div>
    </header>
  );
}

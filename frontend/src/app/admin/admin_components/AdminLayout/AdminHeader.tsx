"use client";
// RESPONSIBILITY: Renders the single persistent fixed Admin shell header. It owns shell controls only; feature business logic stays inside feature modules.

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Building2, QrCode } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminBranchesQueries } from '@/app/admin/branches/branches_context/useAdminBranchesQueries';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import AdminQrScannerModal from '@/app/admin/admin_components/AdminQrScanner/AdminQrScannerModal';
import { AdminHeaderSearch } from '@/app/admin/admin_components/AdminLayout/AdminHeaderSearch';
import { AdminHeaderNotifications } from '@/app/admin/admin_components/AdminLayout/AdminHeaderNotifications';
import { AdminHeaderProfile } from '@/app/admin/admin_components/AdminLayout/AdminHeaderProfile';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import { getAdminRouteHeaderConfig } from '@/app/admin/admin_components/AdminLayout/AdminRouteHeaderConfig';

export default function AdminHeader() {
  const pathname = usePathname();
  const [showScanner, setShowScanner] = useState(false);
  const { selectedBranchId, setSelectedBranchId } = useAdminGlobalStore();
  const { data: branchesData = [] } = useAdminBranchesQueries();
  const branches = Array.isArray(branchesData) ? branchesData : [];
  const { title, subtitle } = getAdminRouteHeaderConfig(pathname);

  const branchOptions = [
    { value: 'all', label: 'All Branches (Aggregate)' },
    ...branches.map((branch: Branch) => ({ value: branch.id, label: branch.name })),
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 h-16 bg-card border-b border-border px-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-foreground motion-safe:transition-colors bg-input hover:bg-background rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} strokeWidth={2} />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
            {subtitle ? <p className="text-sm text-secondary truncate mt-0.5">{subtitle}</p> : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <AdminHeaderSearch />
          <div className="hidden lg:flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1.5">
            <Building2 size={15} className="text-primary flex-shrink-0" aria-hidden="true" />
            <AdminSearchableDropdown
              options={branchOptions}
              value={selectedBranchId}
              onChange={(value) => setSelectedBranchId(String(value))}
              className="w-52"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            aria-label="Open QR Scanner kiosk mode"
            className="min-h-11 min-w-11 px-2 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors border border-transparent hover:border-border flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <QrCode size={18} strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline text-sm font-medium">Scanner</span>
          </button>
          <ThemeToggle />
          <AdminHeaderNotifications />
          <AdminHeaderProfile />
        </div>
      </header>
      <AdminQrScannerModal open={showScanner} onClose={() => setShowScanner(false)} />
    </>
  );
}

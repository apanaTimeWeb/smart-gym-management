// RESPONSIBILITY: Renders the fixed top navigation bar — page title, global search, theme toggle, notifications dropdown, and user profile dropdown. No API calls.
'use client';

import { useState } from 'react';
import { Menu, Building2, QrCode } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminBranchesData } from '@/app/admin/admin_store/useAdminBranchesData';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import AdminQrScannerModal from '@/app/admin/admin_components/AdminQrScanner/AdminQrScannerModal';
import { AdminHeaderSearch } from './AdminHeaderSearch';
import { AdminHeaderNotifications } from './AdminHeaderNotifications';
import { AdminHeaderProfile } from './AdminHeaderProfile';
import type { AdminHeaderProps } from '@/app/admin/admin_components/AdminLayout/AdminLayoutTypes';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [showScanner, setShowScanner] = useState(false);
  const { selectedBranchId, setSelectedBranchId } = useAdminGlobalStore();
  const { data: branchesData = [] } = useAdminBranchesData();
  const branches = Array.isArray(branchesData) ? branchesData : [];

  const branchOptions = [
    { value: 'all', label: 'All Branches (Aggregate)' },
    ...(branches as Branch[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <>
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          className="p-2 -ml-3 text-secondary hover:text-foreground motion-safe:transition-colors bg-input hover:bg-background rounded-lg border border-border"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          aria-label="Toggle Sidebar"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-secondary mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AdminHeaderSearch />

        {/* Branch Selector */}
        <div className="hidden lg:flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1.5">
          <Building2 size={15} className="text-primary flex-shrink-0" />
          <AdminSearchableDropdown
            options={branchOptions}
            value={selectedBranchId}
            onChange={(val) => setSelectedBranchId(val as string)}
            className="w-52"
          />
        </div>

        {/* QR Scanner Mode (Kiosk) — visible on all breakpoints (Rule 64) */}
        <button
          onClick={() => setShowScanner(true)}
          aria-label="Open QR Scanner kiosk mode"
          className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors border border-transparent hover:border-border flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <QrCode size={18} strokeWidth={2} />
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

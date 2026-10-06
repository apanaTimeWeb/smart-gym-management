"use client";
// RESPONSIBILITY: Toggles the Admin shell table density between comfortable and compact without owning server state.
import { useTranslations } from 'next-intl';
import { LayoutList } from 'lucide-react';
import { useAdminLayoutDensity } from '@/app/frontend_admin/admin_layout/admin_layout_shell/useAdminLayoutDensity';

/** Renders the zero-business compact/comfortable density toggle for the Admin shell. */
export default function AdminLayoutDensityToggle() {
  const t = useTranslations();
  const { density, toggleDensity } = useAdminLayoutDensity();
  return (
    <button
      type="button"
      onClick={toggleDensity}
      aria-pressed={density === 'compact'}
      aria-label={density === 'compact' ? t('admin_layout.AdminLayoutDensityToggle.remaining_useComfortableDensity') : t('admin_layout.AdminLayoutDensityToggle.remaining_useCompactDensity') }
      title={density === 'compact' ? t('admin_layout.AdminLayoutDensityToggle.remaining_comfortableDensity') : t('admin_layout.AdminLayoutDensityToggle.remaining_compactDensity') }
      className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
      data-testid="admin_layout-admin-density-toggle-toggle"
    >
      <LayoutList size={18} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

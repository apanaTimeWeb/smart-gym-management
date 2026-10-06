"use client";
// RESPONSIBILITY: Displays per-staff permission overrides and owns the toggle/reset interaction surface defined by the Permissions feature map.
/**
 * @description AdminPermissionsStaffOverrides: Displays per-staff permission overrides and owns the toggle/reset interaction surface defined by the Permissions feature map.
 * @dependencies Consumes useAdminPermissionsLogic, AdminPermissionsConstants.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsLogic';
import { PERMISSION_FEATURES } from '@/app/frontend_admin/admin_permissions/admin_permissions_constants/AdminPermissionsConstants';

/** Renders staff-specific overrides and invokes the documented confirmation-backed mutations.
 */
/**
 * @description Renders the / PermissionsStaffOverrides UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminPermissionsStaffOverrides() {
  const t = useTranslations();

  const { overrides, toggleStaffPermission, resetToDefaults, saving } = useAdminPermissionsLogic();
  const featureMap = useMemo(() => new Map(PERMISSION_FEATURES.map((item) => [item.key, t(item.labelKey)])), []);
  if (overrides.length === 0) return <div className="bg-card rounded-xl border border-border p-5"><h3 className="text-sm font-semibold text-primary">{t('permissions.admin_permissions_staff_overrides.text_347718c2e3')}</h3><p className="mt-2 text-xs text-secondary">{t('permissions.admin_permissions_staff_overrides.text_05a1c7e503')}</p></div>;
  return <div className="bg-card rounded-xl border border-border overflow-hidden"><div className="px-5 py-4 border-b border-border"><h3 className="text-base font-semibold text-primary">{t('permissions.admin_permissions_staff_overrides.text_347718c2e3')}</h3><p className="text-xs text-secondary mt-1">{t('permissions.admin_permissions_staff_overrides.text_fe080f8a0d')}</p></div><div className="divide-y divide-border">{overrides.map((item , __testIdIndex27) => <section key={item.staffId} className="p-5"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><p className="text-sm font-semibold text-primary">{item.staffName}</p><p className="text-xs text-secondary">{item.role} · {item.staffId}</p></div><button type="button" onClick={() => resetToDefaults(item.staffId, item.staffName, item.role)} disabled={saving} className="min-h-11 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-input px-3 text-xs font-semibold text-secondary hover:text-primary hover:bg-surface-hover disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid={`admin_permissions-admin_permissions-staff-overrides-click-map27-${__testIdIndex27}-1`}><RotateCcw size={18} strokeWidth={2} /> {t('permissions.admin_permissions_staff_overrides.text_299ef4aaf3')}</button></div><div className="mt-4 grid gap-2">{Object.entries(item.overrides).map(([key, enabled] , __testIdIndex27) => <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-input p-3"><div className="min-w-0"><p className="text-sm font-medium text-primary">{featureMap.get(key) ?? key}</p><p className="text-xs text-secondary">{t('permissions.admin_permissions_staff_overrides.text_c6c69f06e9')}</p></div><button type="button" onClick={() => toggleStaffPermission(item.staffId, item.staffName, key, !enabled)} disabled={saving} aria-pressed={enabled} aria-label={t('permissions.admin_permissions_staff_overrides.auto_permissionToggle', { action: enabled ? t('permissions.admin_permissions_staff_overrides.auto_32447c7d34') : t('permissions.admin_permissions_staff_overrides.auto_5b6239be97'), feature: featureMap.get(key) ?? key, name: item.staffName })} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95 min-h-11 min-w-11 rounded-full px-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${enabled ? 'bg-success text-on-success' : 'bg-surface-zebra text-secondary'}`} data-testid={`admin_permissions-admin_permissions-staff-overrides-click-2-map27-${__testIdIndex27}-2`}>{enabled ? t('permissions.admin_permissions_staff_overrides.auto_5037b668d6') : t('permissions.admin_permissions_staff_overrides.auto_759b88491c')}</button></div>)}</div><div className="mt-3 flex items-center gap-2 text-xs text-warning"><AlertTriangle size={18} strokeWidth={2} /><span>{t('permissions.admin_permissions_staff_overrides.text_59b732d48e')}</span></div></section>)}</div></div>;
}

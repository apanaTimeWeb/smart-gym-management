"use client";
// RESPONSIBILITY: Renders the module-owned empty state for an empty permission matrix.
/**
 * @description AdminPermissionsEmptyState: Empty-state presentation for an unconfigured permission matrix.
 * @dependencies Uses module-local translations and semantic design tokens only.
 * @edge-case Keeps the matrix usable when the backend returns an empty permission collection.
 */
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * AdminPermissionsEmptyState presents the documented empty permission-matrix state without owning permission data or business logic.
 * @remarks Uses module-owned translations and semantic design tokens only.
 * @dependencies Depends on next-intl translations and the approved Lucide icon set.
 * @edge-case Remains available when the permission collection is empty or unavailable while preserving keyboard and screen-reader semantics.
 */
export default function AdminPermissionsEmptyState() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center" data-testid="admin_permissions-admin_permissions-empty-state">
      <ShieldCheck size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>
      <p className="text-sm font-semibold text-primary">{t('permissions.admin_permissions_empty_state.title')}</p>
      <p className="max-w-md text-sm text-secondary">{t('permissions.admin_permissions_empty_state.description')}</p>
    </div>
  );
}

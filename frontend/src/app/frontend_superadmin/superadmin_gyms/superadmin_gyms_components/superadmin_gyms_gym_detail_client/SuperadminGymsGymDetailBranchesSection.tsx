'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailBranchesSection owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders read-only branch and franchise visibility for one Gym Detail record.
import { Building2, MapPin, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';


export default function SuperadminGymsGymDetailBranchesSection() {
  const t = useTranslations('superadmin_gyms');
  const cards = [
    { label: 'Total Branches', note: 'Synced from Admin portal', icon: Building2 },
    { label: 'Franchise Partners', note: 'Read-only for Superadmin', icon: Ticket },
    { label: 'Active Locations', note: 'Contact gym admin to modify', icon: MapPin },
  ];
  return <div className="space-y-4"><div className="rounded-xl border border-border bg-card p-8 text-center"><Building2 size={18} strokeWidth={2} className="mx-auto mb-4 text-disabled" aria-hidden="true"/><h2 className="mb-2 text-xl font-bold text-primary">{t('ui.branch_amp_franchise_overview_1ed8e4fe')}</h2><p className="mx-auto max-w-md text-secondary">{t('ui.branch_and_franchise_management_is_handled_e_ae86071b')}</p></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{cards.map(({ label, note, icon: Icon }) => <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"><div className="rounded-lg bg-primary-subtle p-3 text-primary"><Icon size={18} strokeWidth={2} aria-hidden="true" /></div><div><p className="text-xs uppercase tracking-wider text-secondary">{label}</p><p className="text-2xl font-bold text-primary">{t('ui.text_26aeabd0')}</p><p className="mt-0.5 text-xs text-disabled">{note}</p></div></div>)}</div></div>;
}

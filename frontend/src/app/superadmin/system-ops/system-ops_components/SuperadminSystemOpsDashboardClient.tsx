// RESPONSIBILITY: Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls.
'use client';

import Link from 'next/link';
import { useSuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_utils/useSuperadminSystemOpsSummary';
import type { SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';
import SuperadminSystemOpsDashboardSkeleton from '@/app/superadmin/system-ops/system-ops_components/SuperadminSystemOpsDashboardSkeleton';


import { SUPERADMIN_SYSTEM_OPS_CARD_DEFINITIONS } from '@/app/superadmin/system-ops/system-ops_constants/SuperadminSystemOpsDashboardConstants';

export default function SuperadminSystemOpsDashboardClient() {
  const query = useSuperadminSystemOpsSummary();
  if (query.isPending) return <SuperadminSystemOpsDashboardSkeleton />;
  if (query.isError || !query.data?.data) return <section className="space-y-3 rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert"><h1 className="text-lg font-semibold text-danger">System Operations data could not be loaded.</h1><p className="text-sm text-secondary">Please retry the request.</p><button type="button" onClick={() => void query.refetch()} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Try Again</button></section>;

  const summary = query.data.data;
  return <section className="space-y-6" aria-labelledby="superadmin-system-ops-title"><div className="space-y-2"><h1 id="superadmin-system-ops-title" className="text-2xl font-bold text-primary">System Operations Dashboard</h1><p className="text-secondary">Review operational summaries and open the owning system feature for detailed actions.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{SUPERADMIN_SYSTEM_OPS_CARD_DEFINITIONS.map(({ key, title, description, href, icon: Icon, label, toneClass }) => <Link key={key} href={href} className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary"><div className="flex items-center gap-3"><div className={`rounded-lg p-3 ${toneClass} motion-safe:transition-transform motion-safe:duration-base motion-safe:group-motion-safe:hover:scale-105`}><Icon size={18} aria-hidden="true" /></div><h2 className="text-lg font-bold text-primary">{title}</h2></div><p className="flex-1 text-sm text-secondary">{description}</p><div className="flex items-center justify-between border-t border-border pt-4"><span className="rounded bg-surface-highlight px-2 py-1 text-xs font-semibold text-primary">{label(summary)}</span><span className="text-sm font-medium text-primary">Open →</span></div></div></Link>)}</div></section>;
}

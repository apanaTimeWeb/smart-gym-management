// RESPONSIBILITY: Renders SLA status metrics and tenant-level downtime-credit actions for the Superadmin System route.
'use client';
// DATA FLOW: System SLA API/MSW → TanStack Query → SuperadminSystemSlaTab → visible SLA table/action state.
import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Loader2, Search, ServerCog, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatNumber } from '@/lib/formatters';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
import { useSuperadminSystemSla } from '@/app/superadmin/system/system_utils/useSuperadminSystemSla';
import { useUrlState } from '@/hooks/useUrlState';
import type { SuperadminSystemSlaRecord } from '@/app/superadmin/system/system_types/SuperadminSystemSlaTypes';

const TABLE_COLUMN_COUNT = 6;

export default function SuperadminSystemSlaTab() {
  const { getParam, setParam } = useUrlState();
  const { confirm } = useSuperadminConfirm();
  const [pendingCreditId, setPendingCreditId] = useState<string | null>(null);
  const slaSearch = getParam('search', '');
  const setSlaSearch = (value: string) => setParam('search', value);
  const queryParams = useMemo(() => (slaSearch ? { search: slaSearch } : undefined), [slaSearch]);
  const { query, issueCredit, isIssuing } = useSuperadminSystemSla(queryParams);

  const slaData: SuperadminSystemSlaRecord[] = query.data?.data ?? [];
  const totalTenants = query.data?.meta?.total ?? slaData.length;
  const breachedTenants = slaData.filter((item) => item.status === 'BREACHED').length;
  const avgUptimeRaw = slaData.length ? slaData.reduce((sum, item) => sum + item.actualUptime, 0) / slaData.length : 0;
  const avgUptime = formatNumber(Math.round(avgUptimeRaw * 100) / 100);

  const handleIssueCredit = async (tenantId: string, gymName: string) => {
    if (isIssuing) return;
    const confirmed = await confirm({ title: 'Issue Downtime Credit', message: `Issue the documented downtime credit for ${gymName}? This is a financial action.`, type: 'warning', confirmText: 'Issue Credit', cancelText: 'Cancel' });
    if (!confirmed) return;
    setPendingCreditId(tenantId);
    try {
      const response = await issueCredit(tenantId, crypto.randomUUID());
      toast.success(response.message, { id: `superadmin-sla-credit-${tenantId}` });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: `superadmin-sla-credit-error-${tenantId}` });
    } finally {
      setPendingCreditId(null);
    }
  };

  if (query.isError) {
    return <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger-bg/10 p-8 text-center" role="alert"><p className="text-danger">Unable to load SLA data.</p><button type="button" onClick={() => void query.refetch()} className="rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  }

  if (query.isPending) {
    return <div className="space-y-6" aria-busy="true" aria-label="Loading SLA data"><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{['sla-a','sla-b','sla-c'].map((id) => <div key={id} className="h-28 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}</div><div className="h-96 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" /></div>;
  }

  return <div className="space-y-8">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-6"><div className="mb-2 flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2 text-primary"><ServerCog size={18} strokeWidth={2} /></div><h3 className="font-semibold text-primary">Tracked Gyms</h3></div><p className="text-3xl font-extrabold text-primary">{formatNumber(totalTenants)}</p></div>
      <div className="rounded-xl border border-border bg-card p-6"><div className="mb-2 flex items-center gap-3"><div className="rounded-lg bg-danger/10 p-2 text-danger"><AlertCircle size={18} strokeWidth={2} /></div><h3 className="font-semibold text-primary">Uptime Failures (30d)</h3></div><p className="text-3xl font-extrabold text-danger">{formatNumber(breachedTenants)}</p></div>
      <div className="rounded-xl border border-border bg-card p-6"><div className="mb-2 flex items-center gap-3"><div className="rounded-lg bg-success/10 p-2 text-success"><CheckCircle size={18} strokeWidth={2} /></div><h3 className="font-semibold text-primary">Global Avg Uptime</h3></div><p className="text-3xl font-extrabold text-success">{avgUptime}%</p></div>
    </div>
    <div className="flex min-h-96 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border bg-header p-4 sm:flex-row sm:items-center sm:justify-between"><h2 className="flex items-center gap-2 text-lg font-bold text-primary"><Clock size={18} strokeWidth={2} className="text-primary" /> Gym Uptime Status</h2><div className="relative"><Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled" /><label className="sr-only" htmlFor="superadmin-system-sla-search">Search gym</label><input id="superadmin-system-sla-search" type="text" placeholder="Search gym..." value={slaSearch} onChange={(event) => setSlaSearch(event.target.value)} className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-64" /></div></div>
      <div className="flex-1 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="border-b border-border bg-input/40 text-xs uppercase tracking-wider text-secondary"><th className="whitespace-nowrap p-4 font-semibold">Gym</th><th className="whitespace-nowrap p-4 font-semibold">Target Uptime</th><th className="whitespace-nowrap p-4 font-semibold">30d Uptime</th><th className="whitespace-nowrap p-4 font-semibold">Downtime (Mins)</th><th className="whitespace-nowrap p-4 font-semibold">Status</th><th className="whitespace-nowrap p-4 text-right font-semibold">Actions</th></tr></thead><tbody className="divide-y divide-border">
        {slaData.map((sla) => { const pending = isIssuing && pendingCreditId === sla.id; const tone = sla.status === 'MET' ? 'bg-success-bg text-success' : sla.status === 'WARNING' ? 'bg-warning-bg text-warning' : 'bg-danger-bg text-danger'; return <tr key={sla.id} className="group text-sm hover:bg-input motion-safe:transition-colors">
          <td className="p-4 font-medium text-primary">{sla.name}</td><td className="p-4 text-secondary">{sla.targetSla}%</td><td className={`p-4 font-bold ${sla.actualUptime < sla.targetSla ? 'text-danger' : 'text-success'}`}>{sla.actualUptime}%</td><td className="p-4 text-secondary">{formatNumber(sla.downtimeMinutes)} <span className="text-xs text-disabled">({formatNumber(sla.downtimeIncidents)} incidents)</span></td><td className="p-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{sla.status}</span></td><td className="p-4 text-right">{sla.status === 'BREACHED' ? <button type="button" onClick={() => void handleIssueCredit(sla.id, sla.name)} disabled={isIssuing} className="inline-flex min-w-28 items-center justify-center gap-1.5 rounded-lg bg-danger/10 px-3 py-2 text-xs font-semibold text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors">{pending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" />Issuing…</> : <><Ticket size={18} strokeWidth={2} />Issue Credit</>}</button> : <span className="text-xs text-disabled">—</span>}</td>
        </tr>; })}
        {slaData.length === 0 && <tr><td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">No gyms found.</td></tr>}
      </tbody></table></div>
    </div>
  </div>;
}

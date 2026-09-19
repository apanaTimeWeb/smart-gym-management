// RESPONSIBILITY: Renders tenant onboarding from hook-owned server state and coordinates private UI state for expansion/search/modal visibility.
'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useSuperadminOnboardingPage } from '@/app/superadmin/onboarding/onboarding_utils/useSuperadminOnboardingPage';
import SuperadminConversionFunnel from '@/app/superadmin/onboarding/onboarding_components/SuperadminConversionFunnel/SuperadminConversionFunnel';
import { SuperadminOnboardingStatsBar } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingStatsBar';
import { SuperadminOnboardingTable } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingTable';
import { SuperadminOnboardingModals } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingModals';
import { SuperadminDateFilterDropdown } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateFilterDropdown';

export default function SuperadminOnboardingClient() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [extendModalId, setExtendModalId] = useState<string | null>(null);
  const [extendDays, setExtendDays] = useState('7');
  const [convertConfirmId, setConvertConfirmId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const queryParams = useMemo(() => { const params: Record<string,string> = {}; if (search) params.search = search; if (startDate) params.startDate = startDate; if (endDate) params.endDate = endDate; return params; }, [search,startDate,endDate]);
  const { listQuery, resendVerification, markVerified, extendTrial, confirmConvertToPaid } = useSuperadminOnboardingPage(queryParams);
  const filtered = listQuery.data?.data ?? [];
  const stats = { total: filtered.length, completed: filtered.filter((tenant) => tenant.onboardingStatus === 'COMPLETED').length, inProgress: filtered.filter((tenant) => tenant.onboardingStatus === 'IN_PROGRESS').length, stalled: filtered.filter((tenant) => tenant.onboardingStatus === 'STALLED').length, trial: filtered.filter((tenant) => tenant.trialStatus === 'TRIAL').length };
  const handleMarkVerified = async (id:string) => { await markVerified(id); };
  const handleResendVerification = async (id:string) => { await resendVerification(id); };
  const handleExtendTrial = async (id:string) => { const days=Number(extendDays); if(!Number.isInteger(days)||days<1||days>90)return; await extendTrial({id,days}); setExtendModalId(null); };
  const handleConvertToPaidConfirmed = async (id:string) => { await confirmConvertToPaid(id); setConvertConfirmId(null); };
  if (listQuery.isPending) return <div className="p-8 text-center text-secondary" aria-busy="true">Loading onboarding data...</div>;
  if (listQuery.isError) return <div className="flex min-h-80 items-center justify-center rounded-xl border border-danger/30 bg-danger-bg p-8 text-center text-danger">Onboarding data could not be loaded.</div>;
  return (<div className="space-y-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h1 className="text-2xl font-bold text-primary">Gym Onboarding</h1><p className="mt-1 text-sm text-secondary">Track email verification, onboarding checklists, and trial lifecycle for every tenant.</p></div><SuperadminDateFilterDropdown /></div>
    <SuperadminOnboardingStatsBar stats={stats} /><SuperadminConversionFunnel tenants={filtered} />
    <div className="relative max-w-sm"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><input aria-label="Search tenant or owner email" type="text" placeholder="Search tenant or email..." value={search} onChange={(event)=>setSearch(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-input py-2 pl-10 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" /></div>
    <SuperadminOnboardingTable filtered={filtered} expandedId={expandedId} setExpandedId={setExpandedId} handleMarkVerified={handleMarkVerified} handleResendVerification={handleResendVerification} setExtendModalId={setExtendModalId} setConvertConfirmId={setConvertConfirmId} />
    <SuperadminOnboardingModals extendModalId={extendModalId} setExtendModalId={setExtendModalId} extendDays={extendDays} setExtendDays={setExtendDays} handleExtendTrial={(id)=>{void handleExtendTrial(id)}} convertConfirmId={convertConfirmId} setConvertConfirmId={setConvertConfirmId} handleConvertToPaidConfirmed={(id)=>{void handleConvertToPaidConfirmed(id)}} />
  </div>);
}

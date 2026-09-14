'use client';
// RESPONSIBILITY: Full Tenant Onboarding page — email verification tracking, onboarding checklist,
// trial management (extend trial, convert to paid). All data is static/hardcoded.
// DATA FLOW: MOCK_ONBOARDINGS → SuperadminOnboardingClient → table rows + expand + modals

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingApi } from '@/app/superadmin/onboarding/superadmin_onboarding_api/superadmin_onboarding_api';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';
import SuperadminConversionFunnel from '@/app/superadmin/onboarding/onboarding_components/SuperadminConversionFunnel/SuperadminConversionFunnel';
import { SuperadminOnboardingStatsBar } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingStatsBar';
import { SuperadminOnboardingTable } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingTable';
import { SuperadminOnboardingModals } from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingModals';
import { SuperadminDateFilterDropdown } from '@/components/ui/SuperadminShared/SuperadminDateFilterDropdown';

export default function SuperadminOnboardingClient() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [extendModalId, setExtendModalId] = useState<string | null>(null);
  const [extendDays, setExtendDays] = useState('7');
  const [convertConfirmId, setConvertConfirmId] = useState<string | null>(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ['superadmin_onboardings'],
    queryFn: () => onboardingApi.fetchOnboardings(),
  });
  const tenants = response?.data || [];

  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // Filter based on Date Range
  const dateFilteredTenants = useMemo(() => {
    if (!startDate && !endDate) return tenants;
    return tenants.filter((t) => {
      if (!t.signupDate) return true;
      const signup = new Date(t.signupDate);
      if (startDate && signup < new Date(startDate)) return false;
      if (endDate && signup > new Date(endDate)) return false;
      return true;
    });
  }, [tenants, startDate, endDate]);

  const filtered = dateFilteredTenants.filter(
    (t) =>
      t.gymName.toLowerCase().includes(search.toLowerCase()) ||
      t.adminEmail.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: dateFilteredTenants.length,
    completed: dateFilteredTenants.filter((t) => t.onboardingStatus === 'COMPLETED').length,
    inProgress: dateFilteredTenants.filter((t) => t.onboardingStatus === 'IN_PROGRESS').length,
    stalled: dateFilteredTenants.filter((t) => t.onboardingStatus === 'STALLED').length,
    trial: dateFilteredTenants.filter((t) => t.trialStatus === 'TRIAL').length,
  };

  const resendMut = useMutation({
    mutationFn: onboardingApi.resendVerification,
    onSuccess: () => {
      toast.success('Verification email resent successfully.');
      queryClient.invalidateQueries({ queryKey: ['superadmin_onboardings'] });
    },
  });

  const markVerifiedMut = useMutation({
    mutationFn: onboardingApi.markVerified,
    onSuccess: () => {
      toast.success('Email marked as verified.');
      queryClient.invalidateQueries({ queryKey: ['superadmin_onboardings'] });
    },
  });

  const extendMut = useMutation({
    mutationFn: ({ id, days }: { id: string; days: number }) => onboardingApi.extendTrial(id, days),
    onSuccess: (data, variables) => {
      toast.success(`Trial extended by ${variables.days} days.`);
      setExtendModalId(null);
      setExtendDays('7');
      queryClient.invalidateQueries({ queryKey: ['superadmin_onboardings'] });
    },
  });

  const convertMut = useMutation({
    mutationFn: onboardingApi.convertToPaid,
    onSuccess: () => {
      toast.success('Gym converted to paid plan.');
      setConvertConfirmId(null);
      queryClient.invalidateQueries({ queryKey: ['superadmin_onboardings'] });
    },
  });

  function handleResendVerification(id: string) {
    resendMut.mutate(id);
  }

  function handleExtendTrial(id: string) {
    const days = parseInt(extendDays, 10);
    if (!days || days < 1) return;
    extendMut.mutate({ id, days });
  }

  function handleConvertToPaidConfirmed(id: string) {
    convertMut.mutate(id);
  }

  function handleMarkVerified(id: string) {
    markVerifiedMut.mutate(id);
  }

  if (isLoading) {
    return <div className="p-8 text-center text-secondary">Loading onboarding data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gym Onboarding</h1>
          <p className="text-secondary mt-1 text-sm">
            Track email verification, onboarding checklists, and trial lifecycle for every gym.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SuperadminDateFilterDropdown />
        </div>
      </div>

      <SuperadminOnboardingStatsBar stats={stats} />

      <SuperadminConversionFunnel tenants={dateFilteredTenants} />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder="Search gym or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      <SuperadminOnboardingTable
        filtered={filtered}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        handleMarkVerified={handleMarkVerified}
        handleResendVerification={handleResendVerification}
        setExtendModalId={setExtendModalId}
        setConvertConfirmId={setConvertConfirmId}
      />

      <SuperadminOnboardingModals
        extendModalId={extendModalId}
        setExtendModalId={setExtendModalId}
        extendDays={extendDays}
        setExtendDays={setExtendDays}
        handleExtendTrial={handleExtendTrial}
        convertConfirmId={convertConfirmId}
        setConvertConfirmId={setConvertConfirmId}
        handleConvertToPaidConfirmed={handleConvertToPaidConfirmed}
      />
    </div>
  );
}

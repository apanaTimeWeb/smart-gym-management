// RESPONSIBILITY: Root client orchestrator for Referrals.
'use client';

import { Plus } from 'lucide-react';
import ManagerReferralsKPIs from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsKPIs';
import ManagerReferralsTable from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsTable';
import ManagerReferralsAddModal from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsAddModal';
import { useManagerReferralsStore } from '@/app/manager/referrals/referrals_store/useManagerReferralsStore';

export default function ManagerReferralsMain() {
  const setIsAddModalOpen = useManagerReferralsStore((s) => s.setIsAddModalOpen);

  return (
    <div className="min-h-full pb-10 motion-safe:animate-in motion-safe:fade-in duration-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Referrals & Rewards</h1>
          <p className="text-sm text-secondary mt-0.5">Track member word-of-mouth acquisitions and manage incentives.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        >
          <Plus size={16} /> Log New Referral
        </button>
      </div>

      <div className="p-6 space-y-6">
        <ManagerReferralsKPIs />
        <ManagerReferralsTable />
      </div>

      <ManagerReferralsAddModal />
    </div>
  );
}

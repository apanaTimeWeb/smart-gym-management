'use client';
// RESPONSIBILITY: Root client orchestrator for Referrals.
import { Plus } from 'lucide-react';
import ManagerReferralsKPIs from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsKPIs';
import ManagerReferralsTable from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsTable';
import ManagerReferralsAddModal from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsAddModal';
import { useManagerReferralsStore } from '@/app/manager/referrals/referrals_store/ManagerUseManagerReferralsStore';

export default function ManagerReferralsMain() {
  const setIsAddModalOpen = useManagerReferralsStore((s) => s.setIsAddModalOpen);

  return (
    <div className="min-h-full pb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Referrals & Rewards</h1>
          <p className="text-sm text-secondary mt-0.5">Track member word-of-mouth acquisitions and manage incentives.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-page"
        >
          <Plus size={18} /> Log New Referral
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

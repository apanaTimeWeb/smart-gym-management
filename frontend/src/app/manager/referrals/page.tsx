// RESPONSIBILITY: Framework route boundary for the Manager referrals module; renders the route-level shell, loading, error, or 404 state.
import { Suspense } from 'react';
import ManagerReferralsMain from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsMain';

export const metadata = {
  title: 'Referrals & Rewards | GymSmart Manager',
};

export default function ManagerReferralsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading Referrals...</div>}>
      <ManagerReferralsMain />
    </Suspense>
  );
}

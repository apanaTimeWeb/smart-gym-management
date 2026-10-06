// RESPONSIBILITY: Renders the manager_referrals route boundary (ManagerReferralsPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerReferralsLoading from '@/app/frontend_manager/manager_referrals/loading';
import ManagerReferralsMain from '@/app/frontend_manager/manager_referrals/manager_referrals_components/manager_referrals_main/ManagerReferralsMain';


export const metadata = {
  title: 'Referrals & Rewards | GymSmart Manager' };

/** @description Route-level ManagerReferralsPage for the Manager frontend module. */
export default function ManagerReferralsPage() {
  return (
    <Suspense fallback={<ManagerReferralsLoading />}>
      <ManagerReferralsMain />
    </Suspense>
  );
}

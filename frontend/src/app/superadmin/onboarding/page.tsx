import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminOnboardingClient from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingClient';
import SuperadminOnboardingV1Client from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingV1Client';
export default function OnboardingPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminOnboardingClient />
      <SuperadminOnboardingV1Client />
    </Suspense>);
}

import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminOnboardingClient from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingClient';
export default function OnboardingPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminOnboardingClient />
    </Suspense>);
}

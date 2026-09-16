import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminOnboardingClient from '@/app/superadmin/onboarding/onboarding_components/SuperadminOnboardingClient';

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminOnboardingClient />
    </Suspense>
  );
}

import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the features page. Renders the interactive client component.
import SuperadminFeaturesClient from '@/app/superadmin/features/features_components/SuperadminFeaturesClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminFeaturesClient />
    </Suspense>
  );
}

import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the infrastructure page. Renders the interactive client component.
import SuperadminInfrastructureClient from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminInfrastructureClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminInfrastructureClient />
    </Suspense>
  );
}

import { Suspense } from 'react';
// RESPONSIBILITY: Server Component that acts as the entry point for the Add Gym page.
import SuperadminAddGymForm from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/SuperadminAddGymForm';

export default function AddGymPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminAddGymForm />
    </Suspense>
  );
}

import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the backups page. Renders the interactive client component.
import SuperadminBackupsClient from '@/app/superadmin/backups/backups_components/SuperadminBackupsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminBackupsClient />
    </Suspense>
  );
}

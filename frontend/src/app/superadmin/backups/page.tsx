import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the backups page. Renders the interactive client component.
import SuperadminBackupsClient from '@/app/superadmin/backups/backups_components/SuperadminBackupsClient';
import SuperadminBackupsV1Client from '@/app/superadmin/backups/backups_components/SuperadminBackupsV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBackupsClient />
      <SuperadminBackupsV1Client />
    </Suspense>);
}

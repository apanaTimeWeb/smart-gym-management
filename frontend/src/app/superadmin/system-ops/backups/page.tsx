// RESPONSIBILITY: Pure Server Component for the backups page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminBackupsClient from '@/app/superadmin/system-ops/backups/backups_components/SuperadminBackupsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBackupsClient />
    </Suspense>);
}

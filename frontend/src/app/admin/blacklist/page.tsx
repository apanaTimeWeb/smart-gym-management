import { Suspense } from 'react';
// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminBlacklistMain from '@/app/admin/blacklist/blacklist_components/AdminBlacklistMain/AdminBlacklistMain';
export default function BlacklistPage() { return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminBlacklistMain />
    </Suspense>
  ); }

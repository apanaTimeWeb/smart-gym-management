import { Suspense } from 'react';
// RESPONSIBILITY: Server route entry that renders the Members client boundary without duplicating client query requests.
import TrainerMembersMain from '@/app/trainer/members/members_components/TrainerMembersMain/TrainerMembersMain';

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-secondary">Loading members…</div>}>
      <TrainerMembersMain />
    </Suspense>
  );
}

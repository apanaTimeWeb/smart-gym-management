import { Suspense } from 'react';
import TrainerMembersLoadingSkeleton from '@/app/trainer/members/members_components/TrainerMembersLoadingSkeleton/TrainerMembersLoadingSkeleton';
// RESPONSIBILITY: Server route entry that renders the Members client boundary without duplicating client query requests.
import TrainerMembersMain from '@/app/trainer/members/members_components/TrainerMembersMain/TrainerMembersMain';

export default function MembersPage() {
  return (
    <Suspense fallback={<TrainerMembersLoadingSkeleton />}>
      <TrainerMembersMain />
    </Suspense>
  );
}

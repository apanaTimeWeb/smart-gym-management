// RESPONSIBILITY: Owns the Members list/profile switch and the member-directed messaging modal; data/state remains in module queries and Zustand.
'use client';
import TrainerMembersMessageModal from '@/app/trainer/members/members_components/TrainerMembersMessageModal/TrainerMembersMessageModal';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import TrainerMembersKPIs from '@/app/trainer/members/members_components/TrainerMembersKPIs/TrainerMembersKPIs';
import TrainerMembersToolbar from '@/app/trainer/members/members_components/TrainerMembersToolbar/TrainerMembersToolbar';
import TrainerMembersTable from '@/app/trainer/members/members_components/TrainerMembersTable/TrainerMembersTable';
import TrainerMembersProfile from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfile';

export default function TrainerMembersContent() {
  const msgModal = useTrainerMembersStore((state) => state.msgModal);
  const closeMsg = useTrainerMembersStore((state) => state.closeMsg);
  const { member: selectedMember } = useTrainerSelectedMember();

  return (
    <div className="min-h-full pb-10 print-hide">
      {!selectedMember ? (
        <div className="p-6 space-y-5">
          <TrainerMembersKPIs />
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <TrainerMembersToolbar />
            <TrainerMembersTable />
          </div>
        </div>
      ) : (
        <TrainerMembersProfile />
      )}

      {msgModal?.open && (
        <TrainerMembersMessageModal
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
          onSuccess={closeMsg}
        />
      )}
    </div>
  );
}

'use client';
// RESPONSIBILITY: Entry point component for the members module that sets up context providers and layout.
import TrainerMessageModal from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';

import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import TrainerMembersKPIs from '@/app/trainer/members/members_components/TrainerMembersKPIs/TrainerMembersKPIs';
import TrainerMembersToolbar from '@/app/trainer/members/members_components/TrainerMembersToolbar/TrainerMembersToolbar';
import TrainerMembersTable from '@/app/trainer/members/members_components/TrainerMembersTable/TrainerMembersTable';
import TrainerMembersProfile from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfile';

function MembersContent() {
  const msgModal = useTrainerMembersStore(s => s.msgModal);
  const closeMsg = useTrainerMembersStore(s => s.closeMsg);
  const { member: selectedMember } = useTrainerSelectedMember();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
                        <div className="p-6 space-y-5">
              <TrainerMembersKPIs />
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <TrainerMembersToolbar />
                <TrainerMembersTable />
              </div>
            </div>
          </>
        ) : (
          <TrainerMembersProfile />
        )}

        {/* Add Member modal removed — trainers are view-only, cannot create members */}

        {msgModal?.open && (
          <TrainerMessageModal 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
            onSuccess={() => { closeMsg(); }} 
          />
        )}

      </div>
    </div>
  );
}

export default function TrainerMembersMain() {
  return <MembersContent />;
}


'use client';
// RESPONSIBILITY: Entry point component for the members module that sets up context providers and layout.
import TrainerToast from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import TrainerMessageModal from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';

import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import TrainerMembersKPIs from '@/app/trainer/members/members_components/TrainerMembersKPIs/TrainerMembersKPIs';
import TrainerMembersToolbar from '@/app/trainer/members/members_components/TrainerMembersToolbar/TrainerMembersToolbar';
import TrainerMembersTable from '@/app/trainer/members/members_components/TrainerMembersTable/TrainerMembersTable';
import TrainerMembersProfile from '@/app/trainer/members/members_components/TrainerMembersProfile/TrainerMembersProfile';
import type { MembersInitialData } from '@/app/trainer/members/members_types/TrainerMembers_types';

function MembersContent() {
  const toast = useTrainerMembersStore(s => s.toast);
  const hideToast = useTrainerMembersStore(s => s.hideToast);
  const msgModal = useTrainerMembersStore(s => s.msgModal);
  const closeMsg = useTrainerMembersStore(s => s.closeMsg);
  const showToast = useTrainerMembersStore(s => s.showToast);
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
            onSuccess={() => { showToast('Message sent successfully', 'success'); closeMsg(); }} 
          />
        )}

        {toast && <TrainerToast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    </div>
  );
}

export default function TrainerMembersMain({ initialData }: { initialData?: MembersInitialData | null }) {
  // initialData is available if we want to hydrate TanStack query cache, but since we are using 
  // mock fixtures that resolve instantly, we'll let the hooks fetch on mount.
  return <MembersContent />;
}


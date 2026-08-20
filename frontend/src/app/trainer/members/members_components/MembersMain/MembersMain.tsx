// RESPONSIBILITY: Entry point component for the members module that sets up context providers and layout.
'use client';

import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import TrainerToast from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import TrainerMessageModal from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';

import { MembersProvider, useMembersContext } from '@/app/trainer/members/members_context/MembersContext';
import MembersKPIs from '@/app/trainer/members/members_components/MembersKPIs/MembersKPIs';
import MembersToolbar from '@/app/trainer/members/members_components/MembersToolbar/MembersToolbar';
import MembersTable from '@/app/trainer/members/members_components/MembersTable/MembersTable';
import MemberProfile from '@/app/trainer/members/members_components/MemberProfile/MemberProfile';
import { MembersInitialData } from '@/app/trainer/members/members_types/members_types';
import dynamic from 'next/dynamic';

const MemberModal = dynamic(() => import('@/app/trainer/members/members_components/MemberModal/MemberModal'), { ssr: false });

function MembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, selectedMember } = useMembersContext();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <TrainerHeader title="Members Directory" subtitle="Manage gym members, profiles, and subscriptions" />
            <div className="p-6 space-y-5">
              <MembersKPIs />
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <MembersToolbar />
                <MembersTable />
              </div>
            </div>
          </>
        ) : (
          <MemberProfile />
        )}

        <MemberModal />

        {msgModal?.open && (
          <TrainerMessageModal 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
            onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
          />
        )}

        {toast && <TrainerToast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    </div>
  );
}

export default function MembersMain({ initialData }: { initialData?: MembersInitialData | null }) {
  return (
    <MembersProvider initialData={initialData}>
      <MembersContent />
    </MembersProvider>
  );
}

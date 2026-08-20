// RESPONSIBILITY: Entry point component for the members module that sets up context providers and layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerMessageModal from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import ManagerThermalReceipt from '@/app/manager/manager_components/ManagerShared/ManagerThermalReceipt';

import { MembersProvider, useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import MembersKPIs from '@/app/manager/members/members_components/MembersKPIs/MembersKPIs';
import MembersToolbar from '@/app/manager/members/members_components/MembersToolbar/MembersToolbar';
import MembersTable from '@/app/manager/members/members_components/MembersTable/MembersTable';
import MemberProfile from '@/app/manager/members/members_components/MemberProfile/MemberProfile';
import { MembersInitialData } from '@/app/manager/members/members_types/members_types';
import dynamic from 'next/dynamic';

const MemberModal = dynamic(() => import('@/app/manager/members/members_components/MemberModal/MemberModal'), { ssr: false });

function MembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, printData, setPrintData, selectedMember } = useMembersContext();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <ManagerHeader title="Members Directory" subtitle="Manage gym members, profiles, and subscriptions" />
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
          <ManagerMessageModal 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
            onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
          />
        )}

        {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>

      {printData && (
        <ManagerThermalReceipt data={printData} />
      )}
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

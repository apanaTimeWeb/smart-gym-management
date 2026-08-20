// RESPONSIBILITY: Entry point component for the members module that sets up context providers and layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import AdminMessageModal from '@/app/admin/admin_components/AdminFeedback/AdminMessageModal';
import AdminThermalReceipt from '@/app/admin/admin_components/AdminShared/AdminThermalReceipt';

import { MembersProvider, useMembersContext } from '@/app/admin/members/members_context/MembersContext';
import MembersKPIs from '@/app/admin/members/members_components/MembersKPIs/MembersKPIs';
import MembersToolbar from '@/app/admin/members/members_components/MembersToolbar/MembersToolbar';
import MembersTable from '@/app/admin/members/members_components/MembersTable/MembersTable';
import MemberProfile from '@/app/admin/members/members_components/MemberProfile/MemberProfile';
import { MembersInitialData } from '@/app/admin/members/members_types/members_types';
import dynamic from 'next/dynamic';

const MemberModal = dynamic(() => import('@/app/admin/members/members_components/MemberModal/MemberModal'), { ssr: false });

function MembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, printData, setPrintData, selectedMember } = useMembersContext();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <AdminHeader title="Members Directory" subtitle="Manage gym members, profiles, and subscriptions" />
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
          <AdminMessageModal 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
            onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
          />
        )}

        {toast && <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>

      {printData && (
        <AdminThermalReceipt data={printData} />
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

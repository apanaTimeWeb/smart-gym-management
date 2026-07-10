"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';
import ErpMessageModal from '@/app/(erp)/erp_components/ErpMessageModal';
import ErpThermalReceipt from '@/app/(erp)/erp_components/ErpThermalReceipt';

import { MembersProvider, useMembersContext } from '@/app/(erp)/members/members_context/MembersContext';
import MembersKPIs from '@/app/(erp)/members/members_components/MembersKPIs/MembersKPIs';
import MembersToolbar from '@/app/(erp)/members/members_components/MembersToolbar/MembersToolbar';
import MembersTable from '@/app/(erp)/members/members_components/MembersTable/MembersTable';
import MemberProfile from '@/app/(erp)/members/members_components/MemberProfile/MemberProfile';
import MemberModal from '@/app/(erp)/members/members_components/MemberModal/MemberModal';

import '@/app/(erp)/members/members.css';

function MembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, printData, setPrintData, selectedMember } = useMembersContext();

  return (
    <div className="min-h-full pb-10 members-module">
      <div className="print-hide">
        {!selectedMember ? (
          <>
            <ErpHeader title="Members Directory" subtitle="Manage gym members, profiles, and subscriptions" />
            <div className="p-6 space-y-5">
              <MembersKPIs />
              <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] overflow-hidden">
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
 <ErpMessageModal 
 open={msgModal.open}
 type={msgModal.type}
 recipient={msgModal.recipient}
 message={msgModal.message}
 onClose={closeMsg} 
 onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
 />
 )}

 {toast && <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />}
 </div>

 {printData && (
 <ErpThermalReceipt data={printData} />
 )}
 </div>
 );
}

export default function MembersMain() {
 return (
 <MembersProvider>
 <MembersContent />
 </MembersProvider>
 );
}

"use client";

import Header from '@/components/Header';
import MessageModal from '@/components/MessageModal';
import Toast from '@/components/Toast';
import ThermalReceipt from '@/components/ThermalReceipt';

import { MembersProvider, useMembersContext } from './members_context/MembersContext';
import MembersKPIs from './members_components/MembersKPIs/MembersKPIs';
import MembersToolbar from './members_components/MembersToolbar/MembersToolbar';
import MembersTable from './members_components/MembersTable/MembersTable';
import MemberModal from './members_components/MemberModal/MemberModal';
import MemberProfile from './members_components/MemberProfile/MemberProfile';

import './members.css';

function MembersContent() {
  const { 
    selectedMember, 
    msgModal, closeMsg, showToast, 
    toast, hideToast, 
    printData 
  } = useMembersContext();

  return (
    <div className="min-h-full pb-10 members-module bg-[var(--bg-page)] text-[var(--members-text-primary)]">
      {selectedMember ? (
        <MemberProfile />
      ) : (
        <>
          <Header title="Members" subtitle="Manage all gym members, memberships and payments" />
          <div className="p-6 space-y-5">
            <MembersKPIs />
            <MembersToolbar />
            <MembersTable />
          </div>
        </>
      )}

      {/* Global Modals & Toasts */}
      <MemberModal />
      
      {msgModal?.open && (
        <MessageModal 
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          subject={msgModal.subject}
          onClose={closeMsg} 
          onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
        />
      )}
      
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <ThermalReceipt data={printData} />
      )}
    </div>
  );
}

export default function Members() {
  return (
    <MembersProvider>
      <MembersContent />
    </MembersProvider>
  );
}

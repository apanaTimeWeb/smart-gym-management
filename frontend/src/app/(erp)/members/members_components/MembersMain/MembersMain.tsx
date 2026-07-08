"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';
import ErpMessageModal from '@/app/(erp)/erp_components/ErpMessageModal';
import ErpThermalReceipt from '@/app/(erp)/erp_components/ErpThermalReceipt';

import { MembersProvider, useMembersContext } from '../../members_context/MembersContext';
import MembersKPIs from '../MembersKPIs/MembersKPIs';
import MembersToolbar from '../MembersToolbar/MembersToolbar';
import MembersTable from '../MembersTable/MembersTable';
import MemberProfileModal from '../MemberProfileModal/MemberProfileModal';
import MemberFormModal from '../MemberFormModal/MemberFormModal';

import '../../members.css';

function MembersContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, printData, setPrintData } = useMembersContext();

  return (
    <div className="min-h-full pb-10 members-module">
      <div className="print-hide">
        <ErpHeader title="Members Directory" subtitle="Manage gym members, profiles, and subscriptions" />
        <div className="p-6 space-y-5">
          <MembersKPIs />
          <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] overflow-hidden">
            <MembersToolbar />
            <MembersTable />
          </div>
        </div>

        <MemberFormModal />
        <MemberProfileModal />

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
        <ErpThermalReceipt data={printData} onHide={() => setPrintData(null)} />
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

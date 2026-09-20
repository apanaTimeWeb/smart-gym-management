// RESPONSIBILITY: Renders the ManagerInquiriesContent sub-view extracted from ManagerInquiriesMain; owns only this presentation responsibility.
'use client';
import ManagerConvertLeadModal from '@/app/manager/inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadModal';
import ManagerInquiriesTable from '@/app/manager/inquiries/inquiries_components/InquiriesTable/ManagerInquiriesTable';
import ManagerInquiriesBulkMessageModal from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesBulkMessageModal/ManagerInquiriesBulkMessageModal';
import ManagerInquiriesKPIs from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesKPIs/ManagerInquiriesKPIs';
import ManagerInquiriesMessageModal from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesMessageModal/ManagerInquiriesMessageModal';
import ManagerInquiriesModal from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesModal/ManagerInquiriesModal';
import ManagerInquiriesToolbar from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesToolbar/ManagerInquiriesToolbar';
import { useManagerInquiriesLogic  } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';


export function ManagerInquiriesContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, bulkMsgModal, closeBulkMsg, clearSelection } = useManagerInquiriesLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Inquiries" subtitle="Track, follow up, and convert inquiries into members" />
      <div className="p-6 space-y-5">
        <ManagerInquiriesKPIs />
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <ManagerInquiriesToolbar />
          <ManagerInquiriesTable />
        </div>
      </div>

      <ManagerInquiriesModal />
      <ManagerConvertLeadModal />

      {msgModal?.open && (
        <ManagerInquiriesMessageModal
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
        />
      )}

      {bulkMsgModal?.open && (
        <ManagerInquiriesBulkMessageModal
          open={bulkMsgModal.open}
          type={bulkMsgModal.type}
          recipients={bulkMsgModal.recipients}
          onClose={() => { closeBulkMsg(); clearSelection(); }}
        />
      )}

      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

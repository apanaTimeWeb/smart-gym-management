// RESPONSIBILITY: Entry point for the Inquiries module. Sets up the Context provider and composes all sub-components.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import AdminMessageModal from '@/app/admin/admin_components/AdminFeedback/AdminMessageModal';
import AdminBulkMessageModal from '@/app/admin/admin_components/AdminFeedback/AdminBulkMessageModal';
import { InquiriesProvider, useInquiriesContext } from '@/app/admin/inquiries/inquiries_context/InquiriesContext';
import InquiriesKPIs from '@/app/admin/inquiries/inquiries_components/InquiriesKPIs/InquiriesKPIs';
import InquiriesToolbar from '@/app/admin/inquiries/inquiries_components/InquiriesToolbar/InquiriesToolbar';
import InquiriesTable from '@/app/admin/inquiries/inquiries_components/InquiriesTable/InquiriesTable';
import InquiryModal from '@/app/admin/inquiries/inquiries_components/InquiryModal/InquiryModal';

function InquiriesContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast, bulkMsgModal, closeBulkMsg, clearSelection } = useInquiriesContext();

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Inquiries & Leads" subtitle="Track, follow up, and convert leads into members" />
      <div className="p-6 space-y-5">
        <InquiriesKPIs />
        <InquiriesToolbar />
        <InquiriesTable />
      </div>

      <InquiryModal />

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

      {bulkMsgModal?.open && (
        <AdminBulkMessageModal
          open={bulkMsgModal.open}
          type={bulkMsgModal.type}
          recipients={bulkMsgModal.recipients}
          onClose={closeBulkMsg}
          onSuccess={msg => { showToast(msg, 'success'); closeBulkMsg(); clearSelection(); }}
        />
      )}

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

export default function InquiriesMain() {
  return (
    <InquiriesProvider>
      <InquiriesContent />
    </InquiriesProvider>
  );
}

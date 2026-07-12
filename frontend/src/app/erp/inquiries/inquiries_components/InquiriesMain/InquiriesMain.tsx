"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import ErpMessageModal from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import ErpBulkMessageModal from '@/app/erp/erp_components/ErpFeedback/ErpBulkMessageModal';
import { InquiriesProvider, useInquiriesContext } from '@/app/erp/inquiries/inquiries_context/InquiriesContext';
import InquiriesKPIs from '@/app/erp/inquiries/inquiries_components/InquiriesKPIs/InquiriesKPIs';
import InquiriesToolbar from '@/app/erp/inquiries/inquiries_components/InquiriesToolbar/InquiriesToolbar';
import InquiriesTable from '@/app/erp/inquiries/inquiries_components/InquiriesTable/InquiriesTable';
import InquiryModal from '@/app/erp/inquiries/inquiries_components/InquiryModal/InquiryModal';
import '@/app/erp/inquiries/inquiries.css';

function InquiriesContent() {
 const { toast, hideToast, msgModal, closeMsg, showToast, bulkMsgModal, closeBulkMsg, clearSelection } = useInquiriesContext();

 return (
 <div className="min-h-full pb-10 inquiries-module">
 <ErpHeader title="Inquiries & Leads" subtitle="Track, follow up, and convert leads into members" />
 <div className="p-6 space-y-5">
 <InquiriesKPIs />
 <InquiriesToolbar />
 <InquiriesTable />
 </div>

 <InquiryModal />
 
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
 
 {bulkMsgModal?.open && (
  <ErpBulkMessageModal
    open={bulkMsgModal.open}
    type={bulkMsgModal.type}
    recipients={bulkMsgModal.recipients}
    onClose={closeBulkMsg}
    onSuccess={msg => { showToast(msg, 'success'); closeBulkMsg(); clearSelection(); }}
  />
 )}
 
 {toast && (
 <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
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

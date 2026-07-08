"use client";

import Header from '@/components/Header';
import Toast from '@/components/Toast';
import MessageModal from '@/components/MessageModal';
import { InquiriesProvider, useInquiriesContext } from './inquiries_context/InquiriesContext';
import InquiriesKPIs from './inquiries_components/InquiriesKPIs/InquiriesKPIs';
import InquiriesToolbar from './inquiries_components/InquiriesToolbar/InquiriesToolbar';
import InquiriesTable from './inquiries_components/InquiriesTable/InquiriesTable';
import InquiryModal from './inquiries_components/InquiryModal/InquiryModal';
import './inquiries.css';

function InquiriesContent() {
  const { toast, hideToast, msgModal, closeMsg, showToast } = useInquiriesContext();

  return (
    <div className="min-h-full pb-10 inquiries-module">
      <Header title="Inquiries & Leads" subtitle="Track, follow up, and convert leads into members" />
      <div className="p-6 space-y-5">
        <InquiriesKPIs />
        <InquiriesToolbar />
        <InquiriesTable />
      </div>

      <InquiryModal />
      
      {msgModal?.open && (
        <MessageModal 
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg} 
          onSuccess={msg => { showToast(msg, 'success'); closeMsg(); }} 
        />
      )}
      
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default function Inquiries() {
  return (
    <InquiriesProvider>
      <InquiriesContent />
    </InquiriesProvider>
  );
}

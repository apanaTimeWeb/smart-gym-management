import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Inquiries & Leads module entry point.
import ManagerInquiriesMain from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesMain/ManagerInquiriesMain';

export default function InquiriesPage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerInquiriesMain />
    </Suspense>
  );
}

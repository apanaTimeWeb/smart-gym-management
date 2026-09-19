import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Inquiries & Leads module entry point.
import ManagerInquiriesLoading from '@/app/manager/inquiries/loading';
import ManagerInquiriesMain from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesMain/ManagerInquiriesMain';

export default function InquiriesPage() {
 return (
    <Suspense fallback={<ManagerInquiriesLoading />}>
      <ManagerInquiriesMain />
    </Suspense>
  );
}

// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Inquiries & Leads module entry point.
import { Suspense } from 'react';
import ManagerInquiriesMain from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesMain/ManagerInquiriesMain';
import ManagerInquiriesLoading from '@/app/manager/inquiries/loading';


export default function InquiriesPage() {
 return (
    <Suspense fallback={<ManagerInquiriesLoading />}>
      <ManagerInquiriesMain />
    </Suspense>
  );
}

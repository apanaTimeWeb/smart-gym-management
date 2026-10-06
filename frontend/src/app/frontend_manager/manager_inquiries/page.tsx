// RESPONSIBILITY: Renders the manager_inquiries route boundary (InquiriesPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerInquiriesLoading from '@/app/frontend_manager/manager_inquiries/loading';
import ManagerInquiriesMain from '@/app/frontend_manager/manager_inquiries/manager_inquiries_components/manager_inquiries_main/ManagerInquiriesMain';


/** @description Route-level InquiriesPage for the Manager frontend module. */
export default function InquiriesPage() {
 return (
    <Suspense fallback={<ManagerInquiriesLoading />}>
      <ManagerInquiriesMain />
    </Suspense>
  );
}

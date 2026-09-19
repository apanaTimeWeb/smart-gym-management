'use client';
// RESPONSIBILITY: Entry point for the Inquiries module. Sets up the module hook orchestration and composes all sub-components.
import { ManagerInquiriesContent } from '@/app/manager/inquiries/inquiries_components/ManagerInquiriesMain/ManagerInquiriesContent/ManagerInquiriesContent';

export default function ManagerInquiriesMain() {
  return <ManagerInquiriesContent />;
}

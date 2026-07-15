// RESPONSIBILITY: Root layout for the ERP module. Wraps all ERP pages with the sidebar layout and feedback providers.
import React from 'react';
import ErpLayout from '@/app/erp/erp_components/ErpLayout/ErpLayout';
import { ErpConfirmProvider } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export const metadata = {
  title: 'GymSmart ERP | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

export default function ERPLayout({ children }: { children: React.ReactNode }) {
 return (
    <ErpConfirmProvider>
      <ErpLayout>{children}</ErpLayout>
    </ErpConfirmProvider>
  );
}

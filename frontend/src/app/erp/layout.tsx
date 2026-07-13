// RESPONSIBILITY: Root layout for the ERP module. Wraps all ERP pages with the sidebar layout and feedback providers.
import ErpLayout from '@/app/erp/erp_components/ErpLayout/ErpLayout';
import { ErpConfirmProvider } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export default function ERPLayout({ children }: { children: React.ReactNode }) {
 return (
    <ErpConfirmProvider>
      <ErpLayout>{children}</ErpLayout>
    </ErpConfirmProvider>
  );
}

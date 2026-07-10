import ErpLayout from '@/app/(erp)/erp_components/ErpLayout';
import { ErpConfirmProvider } from '@/app/(erp)/erp_components/ErpFeedback/ErpConfirmProvider';

export default function ERPLayout({ children }: { children: React.ReactNode }) {
 return (
    <ErpConfirmProvider>
      <ErpLayout>{children}</ErpLayout>
    </ErpConfirmProvider>
  );
}

// RESPONSIBILITY: Renders the SuperadminInvoicesHeader component.
import { Plus, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface InvoicesHeaderProps {
  onLogPaymentClick: () => void;
}

export default function SuperadminInvoicesHeader({ onLogPaymentClick }: InvoicesHeaderProps) {
  const handleExportCSV = async () => {
    toast.success('Exporting invoices...');
    try {
      const { invoicesApi } = await import('@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api');
      // @ts-expect-error GET /superadmin/invoices/export to be implemented on backend
      const res = await invoicesApi.exportInvoicesCSV();
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
      } else {
        toast.error('Export URL not found.');
      }
    } catch (err) {
      toast.error('Failed to export invoices.');
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">SaaS Revenue & Invoices</h1>
        <p className="text-secondary mt-1">Track actual payments from gym owners via Stripe/Razorpay.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onLogPaymentClick}
          className="bg-input text-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-border motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out flex items-center gap-2"
        >
          <Plus size={18} /> Log Manual Payment
        </button>
        <button 
          onClick={handleExportCSV}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out flex items-center gap-2"
        >
          <ArrowUpRight size={18} /> Export CSV
        </button>
      </div>
    </div>
  );
}

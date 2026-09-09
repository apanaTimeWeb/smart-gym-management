// RESPONSIBILITY: Renders the page title and action buttons (Log Payment, Export CSV) for the Invoices page.
import { Plus, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';

interface InvoicesHeaderProps {
  onLogPaymentClick: () => void;
}

export default function SuperadminInvoicesHeader({ onLogPaymentClick }: InvoicesHeaderProps) {
  const handleExportCSV = async () => {
    toast.loading('Exporting invoices...', { id: 'invoice-export' });
    try {
      const res = await invoicesApi.exportInvoicesCSV();
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
        toast.success('Export ready.', { id: 'invoice-export' });
      } else {
        toast.error(res.message || 'Export URL not found.', { id: 'invoice-export' });
      }
    } catch {
      toast.error('Failed to export invoices.', { id: 'invoice-export' });
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

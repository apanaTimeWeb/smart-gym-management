import { Plus, ArrowUpRight } from 'lucide-react';

interface InvoicesHeaderProps {
  onLogPaymentClick: () => void;
}

export default function InvoicesHeader({ onLogPaymentClick }: InvoicesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">SaaS Revenue & Invoices</h1>
        <p className="text-secondary mt-1">Track actual payments from gym owners via Stripe/Razorpay.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onLogPaymentClick}
          className="bg-input text-foreground border border-border px-4 py-2 rounded-lg font-medium hover:bg-border transition-all duration-200 ease-in-out flex items-center gap-2"
        >
          <Plus size={18} /> Log Manual Payment
        </button>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-all duration-200 ease-in-out flex items-center gap-2">
          <ArrowUpRight size={18} /> Export CSV
        </button>
      </div>
    </div>
  );
}

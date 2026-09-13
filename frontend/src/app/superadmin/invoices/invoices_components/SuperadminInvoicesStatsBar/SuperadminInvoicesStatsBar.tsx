'use client';
// RESPONSIBILITY: Renders the SuperadminInvoicesStatsBar component.
import { DollarSign, AlertCircle } from 'lucide-react';
import { useDateRangeSuffix } from '@/app/superadmin/superadmin_components/SuperadminShared/useDateRangeSuffix';

interface InvoicesStatsBarProps {
  totalRevenue: number;
  failedRevenue: number;
  pendingRevenue: number;
  overdueCount: number;
}

export default function SuperadminInvoicesStatsBar({ totalRevenue, failedRevenue, pendingRevenue, overdueCount }: InvoicesStatsBarProps) {
  const dateSuffix = useDateRangeSuffix(false); // lower case or upper depending on styling, here it is title case usually but hook defaults to uppercase. We can pass false. Wait, no, we can pass true for consistency or use a default. Let's use `useDateRangeSuffix()` which returns uppercase string starting with space. But existing label is `Total Collected`. Let's just use it default. Wait, the existing is "Total Collected (This Month)". Let's replace with `Total Collected${dateSuffix}`. 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 motion-safe:hover:-translate-y-1 hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out">
        <div className="p-4 bg-success/10 rounded-xl text-success"><DollarSign size={32} /></div>
        <div>
          <p className="text-sm font-medium text-secondary">Total Collected{dateSuffix}</p>
          <p className="text-3xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-card border border-destructive/30 rounded-xl p-6 flex items-center gap-4 motion-safe:hover:-translate-y-1 hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out">
        <div className="p-4 bg-danger-bg/10 rounded-xl text-danger"><AlertCircle size={32} /></div>
        <div>
          <p className="text-sm font-medium text-secondary">Failed Payments{dateSuffix}</p>
          <p className="text-3xl font-bold text-danger">₹{failedRevenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 motion-safe:hover:-translate-y-1 hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out">
        <div className="p-4 bg-warning/10 rounded-xl text-warning"><DollarSign size={32} /></div>
        <div>
          <p className="text-sm font-medium text-secondary">Pending Revenue{dateSuffix}</p>
          <p className="text-3xl font-bold text-foreground">₹{pendingRevenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-card border border-destructive/30 rounded-xl p-6 flex items-center gap-4 motion-safe:hover:-translate-y-1 hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out">
        <div className="p-4 bg-danger-bg/10 rounded-xl text-danger"><AlertCircle size={32} /></div>
        <div>
          <p className="text-sm font-medium text-secondary">Overdue Count{dateSuffix}</p>
          <p className="text-3xl font-bold text-danger">{overdueCount}</p>
        </div>
      </div>
    </div>
  );
}

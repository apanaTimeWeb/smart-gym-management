import React from 'react';
import { Receipt } from 'lucide-react';
import type { SaaSInvoice } from '@/app/superadmin/superadmin_types/superadmin_types';
import InvoicesTableRow from './InvoicesTableRow';

interface InvoicesTableProps {
  invoices: SaaSInvoice[];
}

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-full">
        <thead>
          <tr className="bg-header border-b border-border text-sm">
            <th className="p-4 font-semibold text-secondary">Invoice ID</th>
            <th className="p-4 font-semibold text-secondary">Gym (Tenant)</th>
            <th className="p-4 font-semibold text-secondary">Plan</th>
            <th className="p-4 font-semibold text-secondary">Amount</th>
            <th className="p-4 font-semibold text-secondary">Status</th>
            <th className="p-4 font-semibold text-secondary">Date</th>
            <th className="p-4 font-semibold text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {invoices.map((inv) => (
            <InvoicesTableRow key={inv.id} invoice={inv} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/invoices_types';
import InvoicesTableRow from './InvoicesTableRow';
import InvoicesEmptyState from '@/app/superadmin/invoices/invoices_components/InvoicesEmptyState/InvoicesEmptyState';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

interface InvoicesTableProps {
  invoices: SaaSInvoice[];
}

const ITEMS_PER_PAGE = 10;

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE) || 1;
  const paginatedInvoices = invoices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="overflow-x-auto flex-1">
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
            {paginatedInvoices.length === 0 ? (
              <tr>
                <td colSpan={7}><InvoicesEmptyState /></td>
              </tr>
            ) : (
              paginatedInvoices.map((inv) => (
                <InvoicesTableRow key={inv.id} invoice={inv} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <SuperadminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

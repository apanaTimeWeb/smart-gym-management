'use client';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via ManagerUseManagerSalesLogic.
import { ManagerSalesUrlConfig } from '@/app/manager/sales/sales_url_config';
import{ useManagerSalesLogic } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';
import { formatCurrencyFromMinorUnits , formatDate} from '@/lib/formatters';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import ManagerSalesEmptyState from '@/app/manager/sales/sales_components/ManagerSalesEmptyState/ManagerSalesEmptyState';
import type { PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { GYM_DETAILS } from '@/app/manager/manager_infrastructure/ManagerGymIdentity';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';

export default function ManagerSalesPendingPayments() {
  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, isLoading, isError, errorMessage } = useManagerSalesLogic();

  const totalPages = Math.ceil(pendingTotal / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={`skeleton-${i}`} className="motion-safe:animate-pulse flex items-center justify-between p-4 border border-border rounded-xl bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-input rounded-full"></div>
              <div>
                <div className="h-4 bg-input rounded w-24 mb-1"></div>
                <div className="h-3 bg-input rounded w-16"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-4 bg-input rounded w-16 mb-1 ml-auto"></div>
                <div className="h-3 bg-input rounded w-20"></div>
              </div>
              <div className="w-24 h-8 bg-input rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <span className="text-sm text-secondary">Retry the request.</span>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-secondary mb-4">
        {pendingTotal} members with pending payments
      </p>
      <div className="space-y-3">
        {pendingPayments.map((p: PendingPaymentMember) => (
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger rounded-full flex items-center justify-center text-danger font-semibold text-sm">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">{p.plan || 'Standard'} Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger">{formatCurrencyFromMinorUnits(p.pendingAmount || 0, ManagerEnvConfig.currencyCode)}</p>
                <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} days overdue</p>
              </div>
              <button
                onClick={() => {
                  const waText = WhatsAppFormatter.formatReceipt({
                    title: GYM_DETAILS.name,
                    subtitle: 'Payment Reminder',
                    date: formatDate(new Date().toISOString()),
                    customerInfo: {
                      'Member': p.name,
                      'Plan': p.plan || 'Standard' },
                    sections: [
                      {
                        title: 'Outstanding Dues',
                        items: {
                          'Pending Amount': formatCurrencyFromMinorUnits(p.pendingAmount || 0, ManagerEnvConfig.currencyCode),
                          'Overdue By': `${p.daysOverdue || 0} days` }
                      }
                    ],
                    footer: 'Please clear dues ASAP to avoid service interruption.'
                  });
                  window.open(`${ManagerSalesUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${p.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(waText)}`, '_blank');
                }}
                className="px-3 py-1.5 text-xs text-on-primary bg-primary rounded-lg font-medium motion-safe:transition-all motion-safe:duration-200 ease-in-out hover:bg-primary-hover motion-safe:active:scale-95"
              >
                Send Reminder
              </button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <ManagerSalesEmptyState message="No pending payments" subtext="All members are up to date." />
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
          <ManagerPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}

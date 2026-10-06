// RESPONSIBILITY: Renders ManagerCommunicationsHistory's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Search, MessageCircle, Mail, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMM_STATUS_STYLES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { MANAGER_COMMUNICATION_HISTORY_HEADERS } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsTableConstants';
import { useManagerCommunicationsLogic } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsLogic';
import { ManagerCommunicationsFormatDate } from '@/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';





/** @description Renders the ManagerCommunicationsHistory component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerCommunicationsHistory() {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const {
    paginatedCampaigns, isPending, isError, errorMessage,
    historySearch, setHistorySearch,
    historyChannelFilter, setHistoryChannelFilter,
    currentPage, setCurrentPage, totalPages,
    filteredCampaigns } = useManagerCommunicationsLogic();

  if (isPending) return <ManagerTableSkeleton rows={5} />;

  if (isError) {
    return (
      <div data-testid="manager_communications-manager-communications-history-status" role="alert" className="bg-card border border-border rounded-xl p-12 text-center space-y-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-sm font-semibold text-danger">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <p className="text-sm text-secondary">{t("COPY_RETRY_REQUEST_ADJUST_CURRENT_FILTERS")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-history-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_CAMPAIGNS")}
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'whatsapp', 'email'] as const).map((ch, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all capitalize ${
                historyChannelFilter === ch
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-input border-border text-secondary hover:text-primary'
              } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationshistory-button-all-channels-${mapIndex}`}
              key={ch}
              onClick={() => setHistoryChannelFilter(ch)}
              
            >
              {ch === 'all' ? t('COPY_ALL_CHANNELS') : ch}
            </button>
          ))}
        </div>
      </div>

      {(() => { if (paginatedCampaigns.length === 0) { return (
        <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center">
            <MessageCircle size={18} strokeWidth={2} className="text-primary"/>
          </div>
          <p className="text-base font-semibold text-primary">{t("COPY_NO_CAMPAIGNS_YET")}</p>
          <p className="text-sm text-secondary">{t("COPY_SEND_FIRST_CAMPAIGN_USING_COMPOSE_TAB")}</p>
        </div>
      ); } return (
        <div className="bg-card rounded-xl border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-subtle">
                  {MANAGER_COMMUNICATION_HISTORY_HEADERS.map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedCampaigns.map((c) => {
                  const statusStyle = COMM_STATUS_STYLES[c.status] ?? COMM_STATUS_STYLES.sent;
                  const isWA = c.channel === 'whatsapp';
                  return (
                    <tr key={c.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-primary">{c.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-on-success ${isWA ? 'bg-success' : 'bg-info text-on-info'}`}
                         data-testid="manager_communications-managercommunicationshistory-status-badge-1">
                          {isWA ? <MessageCircle size={18} strokeWidth={2}/> : <Mail size={18} strokeWidth={2}/>}
                          {isWA ? t('COPY_WHATSAPP_1') : t('COPY_EMAIL_2')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">{c.segmentLabel}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-secondary">
                          <Users size={18} strokeWidth={2}/>
                          {c.recipientCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-primary font-medium">{c.sentCount}</td>
                      <td className="px-4 py-3">
                        <span data-testid={`manager_communications-manager-communications-history-status-${c.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle?.bg || ''} ${statusStyle?.text || ''}`}>
                          {statusStyle?.label || c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                        {ManagerCommunicationsFormatDate(c.sentAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border">
            <ManagerPagination data-testid="manager_communications-managercommunicationshistory-managerpagination-1"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCampaigns.length}
              itemsPerPage={10}
            />
          </div>
        </div>
      ); })()}
    </div>
  );
}

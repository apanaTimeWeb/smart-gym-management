// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { UserRound, MessageCircle, Mail, Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { MANAGER_INQUIRIES_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { MANAGER_INQUIRY_CONVERTED_STATUS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { INQUIRIES_TABLE_HEADERS, INQUIRIES_STATUS_LABELS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesSharedConstants';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';
import { ManagerInquiriesDisplayValue, ManagerInquiriesFormatDate } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_utils/ManagerInquiriesFormatters';


/** @description Renders the ManagerInquiriesTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerInquiriesTable() {
  const t = useTranslations('MANAGER_INQUIRIES');

  const { confirm } = useConfirm();
  const {
    inquiries, isPending, isError, errorMessage, search, statusFilter, currentPage, setCurrentPage,
    openEdit, openMsg, deleteInquiry, updateStatus, totalInquiries,
    selectedIds, toggleSelectAll, toggleSelectOne } = useManagerInquiriesLogic();

  const allSelected = inquiries.length > 0 && selectedIds.length === inquiries.length;
  const isSelected = (id: string) => selectedIds?.includes(id);

  const totalPages = Math.ceil(totalInquiries / MANAGER_ITEMS_PER_PAGE);

  const MANAGER_SKELETON_ROWS = ['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5'];

  if (isPending) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-subtle">
              <tr>
                <th className="px-5 py-3 w-12" />
                {INQUIRIES_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MANAGER_SKELETON_ROWS.map((key) => (
                <tr key={key} className="motion-safe:animate-pulse">
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-4"></div></td>
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-input"></div>
                    <div className="h-4 bg-input rounded w-24"></div>
                  </td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-32"></div></td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-16"></div></td>
                  <td className="px-5 py-4"><div className="h-8 bg-input rounded-lg w-28"></div></td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-5 py-4"><div className="h-8 bg-input rounded-lg w-32"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-danger overflow-hidden flex flex-col h-full min-h-96 justify-center items-center py-16 text-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <p className="text-sm mt-1 text-secondary">{t("COPY_CHECK_CONNECTION_TRY_AGAIN")}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-subtle">
            <tr>
              <th className="px-5 py-3 w-12 text-left">
                <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-inquiries-table-input-checkbox-toggle"
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  
                />
              </th>
              {INQUIRIES_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map((inq, mapIndex) => {
              // const statusStyle = INQUIRIES_STATUS_STYLES[inq.status] || { bg: 'bg-input', text: 'text-secondary' };
              const selected = isSelected(inq.id);

              return (
                <tr
                  data-testid={`manager_inquiries-inquiries-managerinquiriestable-row-${inq.id}`}
                  key={inq.id}
                  className={[`motion-safe:transition-all cursor-pointer ${selected ? "bg-primary-subtle" : 'hover:bg-primary-subtle'}`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')}
                  tabIndex={0}
                  role="button"
                  aria-label={t("TEXT_EDIT_INQUIRY", { value: inq.name })}
                  onClick={() => openEdit(inq)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openEdit(inq);
                    }
                  }}
                >
                  <td className="px-5 py-3.5 w-12" onClick={e => e.stopPropagation()} data-testid={`manager_inquiries-managerinquiriestable-cell-select-${mapIndex}`}>
                    <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-input-toggleselectone-${mapIndex}`}
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleSelectOne(inq.id)}
                      
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-warning text-on-warning" data-testid="manager_inquiries-managerinquiriestable-status-badge-1">
                        {ManagerInquiriesDisplayValue(inq.name).charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-primary">{ManagerInquiriesDisplayValue(inq.name)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-primary">{ManagerInquiriesDisplayValue(inq.phone)}</p>
                    <p className="text-xs text-secondary">{ManagerInquiriesDisplayValue(inq.email)}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary">{ManagerInquiriesDisplayValue(inq.source)}</td>
                  <td className="px-5 py-3.5" onClick={e => e.stopPropagation()} data-testid={`manager_inquiries-managerinquiriestable-cell-status-${mapIndex}`}>
                    <div className="w-32">
                      <ManagerSearchableDropdown dataTestId="manager_inquiries-managerinquiriestable-managersearchabledropdown-1"
                        value={inq.status}
                        onChange={(val) => updateStatus(inq.id, String(val))}
                        options={Object.entries(INQUIRIES_STATUS_LABELS).map(([val, label]) => ({ label: String(label), value: val }))}
                       data-testid="manager_inquiries-managerinquiriestable-searchable-dropdown-1"/>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary">
                    {ManagerInquiriesFormatDate(inq.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success text-on-success motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-whatsapp-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openMsg(inq, 'whatsapp'); }}
                        
                        title={t("COPY_WHATSAPP")}
                        aria-label={t("TEXT_WHATSAPP_INQUIRY", { value: inq.name })}
                      >
                        <MessageCircle size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-info text-on-info motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-email-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openMsg(inq, 'email'); }}
                        
                        title={t("COPY_EMAIL_1")}
                        aria-label={t("TEXT_EMAIL_INQUIRY", { value: inq.name })}
                      >
                        <Mail size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-convert-to-member-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); updateStatus(inq.id, MANAGER_INQUIRY_CONVERTED_STATUS); }}
                        
                        title={t("COPY_CONVERT_MEMBER_2")}
                        aria-label={t("TEXT_CONVERT_INQUIRY", { value: inq.name })}
                      >
                        <UserRound size={18} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-edit-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openEdit(inq); }}
                        
                        title={t("COPY_EDIT")}
                        aria-label={t("TEXT_EDIT_INQUIRY", { value: inq.name })}
                      >
                        <Edit2 size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-danger text-on-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-delete-inquiry-${mapIndex}`}
                        onClick={async (e) => {
                          e.stopPropagation();
                          const ok = await confirm({
                            title: t("COPY_DELETE_INQUIRY"),
                            message: t("TEXT_DELETE_INQUIRY_CONFIRM_MESSAGE", { value: inq.name }),
                            type: 'danger',
                            confirmText: t("COPY_DELETE_1")
                          });
                          if (ok) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        
                        title={t("COPY_DELETE_2")}
                        aria-label={t("TEXT_DELETE_INQUIRY", { value: inq.name })}
                      >
                        <Trash2 size={18} strokeWidth={2}/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {inquiries.length === 0 && !isPending && !isError && (
              <tr>
                <td colSpan={INQUIRIES_TABLE_HEADERS.length + 1} className="text-center py-12 text-sm text-secondary">
                  {search || statusFilter !== MANAGER_INQUIRIES_STATUS_VALUES.ALL_FILTER ? t('COPY_NO_INQUIRIES_MATCH_FILTER') : t('COPY_NO_INQUIRIES_YET_ADD_FIRST_INQUIRY')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination data-testid="manager_inquiries-managerinquiriestable-managerpagination-2"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalInquiries}
        itemsPerPage={MANAGER_ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

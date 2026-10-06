// RESPONSIBILITY: Renders ManagerHrStaffTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Edit2, Trash2, CheckCircle2, Ban, PlayCircle, Users, Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerHrStaffEmptyState from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_staff_table/ManagerHrStaffEmptyState';
import { STAFF_TABLE_HEADERS } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { ManagerHrDisplayValue, ManagerHrFormatCurrency, ManagerHrFormatDate, ManagerHrMaskSensitiveData } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';

// Rule 71 FIX: toggleStaffStatus now uses useConfirm() modal before firing.
// Rule 48 FIX: Uses ManagerEmptyState component for empty state.


/** @description Renders the ManagerHrStaffTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves loading state, empty state, modal lifecycle, responsive behavior. */
export default function ManagerHrStaffTable() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();

  const { staff, totalStaff, isPending, debouncedSearch, currentPage, setCurrentPage, openEdit, deleteStaff, toggleStaffStatus, setViewProfileData, exportStaff } = useManagerHrLogic();
  const { confirm } = useConfirm();

  const totalPages = Math.max(1, Math.ceil(totalStaff / MANAGER_ITEMS_PER_PAGE));

  if (isPending) {
    return (
      <div className="flex flex-col h-full">
        <div className="hidden lg:block overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-input text-secondary">
              <tr>
                {STAFF_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t("COPY_ACTIONS_2")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={`staff-loading-${i}`} className="motion-safe:animate-pulse">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-input"></div>
                    <div><div className="h-4 bg-input rounded w-24 mb-1"></div><div className="h-3 bg-input rounded w-32"></div></div>
                  </td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-6 bg-input rounded w-16 ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Export CSV toolbar — Rule HIGHLY RECOMMENDED */}
      <div className="flex justify-end px-4 pt-3">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-primary-subtle text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-staff-table-button-export"
          onClick={() => exportStaff()}
          
          aria-label={t("COPY_EXPORT_STAFF_LIST_AS_CSV")}
        >
          <Download size={18} strokeWidth={2}/>{t("COPY_EXPORT_CSV")}</button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>
              {STAFF_TABLE_HEADERS.map(h => (
                <th key={h} className={`text-xs font-semibold uppercase tracking-wider px-4 py-3 ${h === 'Salary' || h === 'Advance' ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t("COPY_ACTIONS_3")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((s, mapIndex) => (
              <tr
                data-testid={`manager_hr-hr-managerhrstafftable-row-${s.id}`}
                key={s.id} 
                className="motion-safe:transition-all hover:bg-surface-hover cursor-pointer motion-safe:duration-base ease-in-out" 
                tabIndex={0}
                role="button"
                aria-label={t("TEXT_OPEN_STAFF_PROFILE", { value: s.name })}
                onClick={() => setViewProfileData(s)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setViewProfileData(s);
                  }
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary">
                      {(s.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{ManagerHrDisplayValue(s.name)}</p>
                      <p className="text-xs text-secondary">{ManagerHrDisplayValue(s.email)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{s.role}</td>
                <td className="px-4 py-3">
                  {s.isActive === false ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger text-on-danger border border-border" data-testid="manager_hr-managerhrstafftable-status-badge-1">
                      <Ban size={18} strokeWidth={2} className=""/>{t("COPY_SUSPENDED")}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-on-success border border-border" data-testid="manager_hr-managerhrstafftable-status-badge-2">
                      <CheckCircle2 size={18} strokeWidth={2} className=""/>{t("COPY_ACTIVE")}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-secondary">{ManagerHrMaskSensitiveData(s.phone)}</td>
                <td className="px-4 py-3 text-sm font-medium text-success text-right">{ManagerHrFormatCurrency(s.salary || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm font-medium text-primary text-right">{s.advanceSalary && s.advanceSalary > 0 ? ManagerHrFormatCurrency(s.advanceSalary, ManagerEnvConfig.currencyCode, locale) : ManagerHrDisplayValue(null)}</td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {ManagerHrDisplayValue(s.joinDate ? ManagerHrFormatDate(s.joinDate) : null)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`p-1.5 rounded-lg motion-safe:transition-all motion-safe:duration-base ease-in-out ${
                        s.isActive === false
                          ? 'text-success hover:bg-success-bg'
                          : 'text-danger hover:bg-danger-bg'
                      } motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-suspend-staff-member-${mapIndex}`}
                      onClick={async (e) => {
                        e.stopPropagation();
                        // Rule 71: toggleStaffStatus is a destructive/reversible action — require confirmation.
                        const isSuspending = s.isActive !== false;
                        const ok = await confirm({
                          title: isSuspending ? t("TEXT_CONFIRM_SUSPEND_TITLE") : t("TEXT_CONFIRM_ACTIVATE_TITLE"),
                          message: isSuspending
                            ? t("TEXT_CONFIRM_SUSPEND_MESSAGE", { value: s.name })
                            : t("TEXT_CONFIRM_ACTIVATE_MESSAGE", { value: s.name }),
                          type: isSuspending ? 'danger' : 'info',
                          confirmText: isSuspending ? t("TEXT_SUSPEND_ACTION") : t("TEXT_ACTIVATE_ACTION") });
                        if (ok) toggleStaffStatus(s);
                      }}
                      
                      title={s.isActive === false ? t("TEXT_ACTIVATE_STAFF") : t("TEXT_SUSPEND_STAFF")}
                      aria-label={s.isActive === false ? t("TEXT_ACTIVATE_STAFF_BY_NAME", { value: s.name }) : t("TEXT_SUSPEND_STAFF_BY_NAME", { value: s.name })}
                    >
                      {s.isActive === false ? <PlayCircle size={18} strokeWidth={2}/> : <Ban size={18} strokeWidth={2}/>}
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded hover:bg-primary-subtle motion-safe:transition-all text-secondary hover:text-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-edit-${s.id}`} 
                      onClick={(e) => { e.stopPropagation(); openEdit(s); }} 
                      
                      title={t("COPY_EDIT")}
                    >
                      <Edit2 size={18} strokeWidth={2}/>
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded motion-safe:transition-all text-danger hover:bg-danger-bg motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-delete-staff-${mapIndex}`} 
                      onClick={async (e) => { 
                        e.stopPropagation(); 
                        const ok = await confirm({
                          title: t("COPY_DELETE_STAFF_1"),
                          message: t("TEXT_DELETE_STAFF_MESSAGE", { value: s.name }),
                          type: 'danger',
                          confirmText: t("COPY_DELETE_2")
                        });
                        if (ok) {
                          deleteStaff(s.id); 
                        }
                      }}
                      
                      title={t("COPY_DELETE_1")}
                    >
                      <Trash2 size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={STAFF_TABLE_HEADERS.length + 1} className="p-0 border-b-0">
                  <ManagerHrStaffEmptyState hasSearch={Boolean(debouncedSearch)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden flex-1 overflow-y-auto divide-y divide-border">
        {staff.map((s, mapIndex) => (
          <article key={`mobile-staff-${s.id}`} className="p-4 bg-card space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-primary truncate">{s.name}</p>
                <p className="text-xs text-secondary truncate">{ManagerHrDisplayValue(s.email)}</p>
              </div>
              <span className={`shrink-0 px-2 py-1 rounded-full text-badge font-semibold ${s.isActive === false ? 'bg-danger text-on-danger' : 'bg-success text-on-success'}`} data-testid="manager_hr-managerhrstafftable-status-badge-3">
                {s.isActive === false ? t('COPY_INACTIVE') : t('COPY_ACTIVE')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-secondary">{t("COPY_ROLE_1")}</p><p className="text-primary truncate">{ManagerHrDisplayValue(s.role)}</p></div>
              <div><p className="text-xs text-secondary">{t("COPY_PHONE_2")}</p><p className="text-primary truncate">{ManagerHrDisplayValue(s.phone)}</p></div>
              <div><p className="text-xs text-secondary">{t("COPY_SALARY")}</p><p className="text-primary">{ManagerHrFormatCurrency(s.salary || 0, ManagerEnvConfig.currencyCode, locale)}</p></div>
              <div><p className="text-xs text-secondary">{t("COPY_JOIN_DATE_2")}</p><p className="text-primary">{s.joinDate ? ManagerHrFormatDate(s.joinDate) : '—'}</p></div>
            </div>
            <div className="flex justify-end gap-2">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-edit-mobile-${s.id}`} type="button" onClick={() => openEdit(s)}  aria-label={t("TEXT_EDIT_STAFF", { value: s.name })}><Edit2 size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-view-mobile-${s.id}`} type="button" onClick={() => setViewProfileData(s)}  aria-label={t("TEXT_VIEW_STAFF", { value: s.name })}><Users size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 min-w-11 p-2 rounded-md motion-safe:transition-all ${s.isActive === false ? 'text-success hover:bg-success-bg' : 'text-danger hover:bg-danger-bg'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-toggle-mobile-${s.id}`} type="button" onClick={async () => {
                const isSuspending = s.isActive !== false;
                const ok = await confirm({ title: isSuspending ? t("TEXT_CONFIRM_SUSPEND_TITLE") : t("TEXT_CONFIRM_ACTIVATE_TITLE"), message: isSuspending ? t("TEXT_CONFIRM_SUSPEND_MESSAGE", { value: s.name }) : t("TEXT_CONFIRM_ACTIVATE_MESSAGE", { value: s.name }), type: isSuspending ? 'danger' : 'info', confirmText: isSuspending ? t("TEXT_SUSPEND_ACTION") : t("TEXT_ACTIVATE_ACTION") });
                if (ok) toggleStaffStatus(s);
              }}  aria-label={s.isActive === false ? t("TEXT_ACTIVATE_STAFF_BY_NAME", { value: s.name }) : t("TEXT_SUSPEND_STAFF_BY_NAME", { value: s.name })}><Ban size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-activate-${mapIndex}`} type="button" onClick={async () => {
                const ok = await confirm({ title: t("COPY_DELETE_STAFF_2"), message: t("TEXT_DELETE_STAFF_MESSAGE", { value: s.name }), type: 'danger', confirmText: t("COPY_DELETE_3") });
                if (ok) deleteStaff(s.id);
              }}  aria-label={t("TEXT_DELETE_STAFF_BY_NAME", { value: s.name })}><Trash2 size={18} strokeWidth={2}/></button>
            </div>
          </article>
        ))}
        {staff.length === 0 && (
          <div className="p-0"><ManagerHrStaffEmptyState hasSearch={Boolean(debouncedSearch)} /></div>
        )}
      </div>
      <ManagerPagination data-testid="manager_hr-managerhrstafftable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalStaff} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

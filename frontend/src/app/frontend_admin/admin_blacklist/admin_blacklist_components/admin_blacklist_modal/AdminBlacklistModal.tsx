"use client";
// RESPONSIBILITY: Modal for adding a member to the blacklist.
import { useTranslations } from 'next-intl';

import { Controller } from 'react-hook-form';
import { Loader2, X } from 'lucide-react';
import { useAdminBlacklistModalForm } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_modal/useAdminBlacklistModalForm';
import { BLACKLIST_GYM_OPTIONS } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistConstants';

/**
 * AdminBlacklistModal renders the admin blacklist modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBlacklistModal: Modal for adding a member to the blacklist.
 * @dependencies Consumes useAdminBlacklistModalForm, AdminBlacklistConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBlacklistModal() {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => typeof message === 'string' && message.startsWith('__i18n:') ? t(message.slice(8)) : String(message ?? '');

  const { showModal, saving, register, handleSubmit, control, errors, scope, selectedGyms, toggleGym, handleClose, saveBlacklist, setValue } = useAdminBlacklistModalForm();

  if (!showModal) return null;


  return (
    <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4" data-testid="admin_blacklist-admin_blacklist-modal-control">
      <div className="absolute inset-0 bg-overlay backdrop-blur-sm" onClick={() => void handleClose()}  data-testid="admin_blacklist-admin_blacklist-modal-click"/>
      <div className="relative bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-md max-h-screen overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-overlay z-10">
          <h2 className="text-lg font-bold text-primary">{t('blacklist.admin_blacklist_modal.text_e0b464e57f')}</h2>
          <button type="button" onClick={() => void handleClose()} className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('blacklist.admin_blacklist_modal.text_bbfa773e5a')} data-testid="admin_blacklist-admin_blacklist-modal-click-2">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={handleSubmit(saveBlacklist)} className="p-6 space-y-4" data-testid="admin_blacklist-admin_blacklist-modal-submit">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">{t('blacklist.admin_blacklist_modal.text_7a88b2371d')}<span className="text-danger">*</span></label>
              <input {...register('memberId')} placeholder={t('blacklist.admin_blacklist_modal.text_bae8fcee2a')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_blacklist-admin_blacklist-modal-control-2"/>
              {errors.memberId && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.memberId.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">{t('blacklist.admin_blacklist_modal.text_64346b483c')}<span className="text-danger">*</span></label>
              <input {...register('memberName')} placeholder={t('blacklist.admin_blacklist_modal.text_d2fbdd7c0d')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_blacklist-admin_blacklist-modal-control-3"/>
              {errors.memberName && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.memberName.message)}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">{t('blacklist.admin_blacklist_modal.text_77064d5265')}<span className="text-danger">*</span></label>
              <input {...register('memberPhone')} placeholder={t('blacklist.AdminBlacklistModal.text_phoneExample')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_blacklist-admin_blacklist-modal-control-4"/>
              {errors.memberPhone && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.memberPhone.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">{t('blacklist.admin_blacklist_modal.text_84add5b295')}<span className="text-danger">*</span></label>
              <input {...register('memberEmail')} placeholder={t('blacklist.admin_blacklist_modal.text_5f1bc37f9c')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_blacklist-admin_blacklist-modal-control-5"/>
              {errors.memberEmail && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.memberEmail.message)}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">{t('blacklist.admin_blacklist_modal.text_f219cc0614')}<span className="text-danger">*</span></label>
            <textarea {...register('reason')} rows={3} placeholder={t('blacklist.admin_blacklist_modal.text_301589da9a')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_blacklist-admin_blacklist-modal-control-6"/>
            {errors.reason && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.reason.message)}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">{t('blacklist.admin_blacklist_modal.text_fcb84ff6bf')}<span className="text-danger">*</span></label>
            <div className="flex gap-3">
              {(['global', 'specific'] as const).map((s, __testIdIndex68) => (
                <button key={s} type="button" onClick={() => setValue('scope', s)}
                  className={`motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex-1 py-2 rounded-lg text-sm font-medium border motion-safe:transition-all capitalize ${scope === s ? 'bg-danger text-on-danger border-border' : 'bg-input text-secondary border-border hover:border-border'}`} data-testid={`admin_blacklist-admin_blacklist-modal-click-3-map68-${__testIdIndex68}-1`}>
                  {s === 'global' ? t('blacklist.admin_blacklist_modal.auto_a3c4f8abb1') : t('blacklist.admin_blacklist_modal.auto_51fddaa265')}
                </button>
              ))}
            </div>
          </div>
          {scope === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">{t('blacklist.admin_blacklist_modal.text_e787b8cb73')}<span className="text-danger">*</span></label>
              <div className="flex flex-wrap gap-2">
                {BLACKLIST_GYM_OPTIONS.filter(o => o.value !== 'all').map((opt, __testIdIndex80) => {
                  const isSelected = selectedGyms.includes(opt.value);
                  return (
                    <button key={opt.value} type="button" onClick={() => toggleGym(opt.value)}
                      className={`motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-sm font-medium border motion-safe:transition-all ${isSelected ? 'bg-danger text-on-danger border-border' : 'bg-input text-secondary border-border hover:border-border'}`} data-testid={`admin_blacklist-admin_blacklist-modal-click-4-map80-${__testIdIndex80}-1`}>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {errors.assignedGyms && <p className="text-xs text-danger mt-1">{getValidationMessage(errors.assignedGyms.message)}</p>}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={() => void handleClose()} className="px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_blacklist-admin_blacklist-modal-click-5">
              {t('blacklist.admin_blacklist_modal.text_77dfd2135f')}</button>
            <button type="submit" disabled={saving} className="px-5 py-2 bg-danger text-on-danger rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity disabled:opacity-60 disabled:cursor-not-allowed motion-safe:active:scale-95 min-w-32 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11" data-testid="admin_blacklist-admin_blacklist-modal-submit-2">
              {saving ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t('blacklist.admin_blacklist_modal.auto_5bc493f10a')}</> : t('blacklist.admin_blacklist_modal.auto_6a52089785')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

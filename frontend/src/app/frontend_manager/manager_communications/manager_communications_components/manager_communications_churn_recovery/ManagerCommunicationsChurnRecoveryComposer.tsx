// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryComposer's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';
import { X, MessageCircle, Mail, Send, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useManagerDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/useManagerDialogFocusTrap';
import { MANAGER_COMMUNICATIONS_WIN_BACK_TIER_OPTIONS } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerCommunicationsChurnRecoveryComposerState } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsChurnRecoveryComposerState';
import type { ManagerCommunicationsChurnRecoveryComposerProps } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsChurnRecoveryComposerTypes';




/**
 * @description Renders/orchestrates the ManagerCommunicationsChurnRecoveryComposer user interface for the communications module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants; @/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard; @/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsChurnRecoveryComposerTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerCommunicationsChurnRecoveryComposer component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle, drawer lifecycle. */
export default function ManagerCommunicationsChurnRecoveryComposer({
  member,
  isOpen,
  onClose,
  onSend,
  isSending,
  defaultTier }: ManagerCommunicationsChurnRecoveryComposerProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const { channel, setChannel, tier, message, setMessage, subject, setSubject, handleTierChange } = useManagerCommunicationsChurnRecoveryComposerState(member, defaultTier);
  const isDirty = isOpen && !isSending;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty);

  function handleClose() { void confirmAndClose(onClose); }

  const dialogRef = useRef<HTMLElement>(null);
  useManagerDialogFocusTrap({ dialogRef, isOpen, onClose: handleClose });

  function handleSend() {
    if (!member) return;
    onSend(member, channel, tier, message, subject);
  }

  const isEmailChannel  = channel === 'email';
  const canSend         = message.trim().length >= 10 && (!isEmailChannel || subject.trim().length >= 3);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div data-testid="manager_communications-managerchurnrecoverycomposer-backdrop-close"
          className="fixed inset-0 bg-overlay-backdrop backdrop-blur-sm z-40 motion-safe:transition-all motion-safe:duration-base ease-in-out"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside data-testid="manager_communications-managercommunicationschurnrecoverycomposer-dialog" ref={dialogRef}
        aria-label={t("COPY_WIN_BACK_MESSAGE_COMPOSER")}
        aria-modal="true"
       role="dialog"
        className={`fixed top-0 right-0 h-full w-full sm:w-120 bg-overlay border-l border-border z-40 flex flex-col shadow-card motion-safe:transition-all motion-safe:duration-slow ${
          isOpen ? 'motion-safe:translate-x-0 motion-reduce:translate-x-0' : 'motion-safe:translate-x-full motion-reduce:translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold text-primary">{t("COPY_WIN_BACK_MESSAGE")}</h2>
            {member && (
              <p className="text-xs text-secondary mt-0.5">{t("COPY_SENDING_1")}<span className="text-primary font-medium">{member.name}</span>
                <span className="ml-2 text-warning">({member.daysSinceExit}{t("COPY_DAYS_SINCE_EXIT")}</span>
              </p>
            )}
          </div>
          <button data-testid="manager_communications-manager-churn-recovery-close-1"
            type="button"
            onClick={handleClose}
            aria-label={t("COPY_CLOSE_COMPOSER")}
            className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Template Tier Selector */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">{t("COPY_TEMPLATE_BASED_TIME_SINCE_EXIT")}</label>
            <div className="flex flex-wrap gap-2">
              {MANAGER_COMMUNICATIONS_WIN_BACK_TIER_OPTIONS.map((opt, mapIndex) => (
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-3 py-1.5 rounded-lg text-xs font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    tier === opt.value
                      ? 'bg-primary-subtle text-primary border-primary'
                      : 'bg-input border-border text-secondary hover:text-primary'
                  } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managerchurnrecoverycomposer-button-secondary-${mapIndex}`}
                  key={opt.value}
                  type="button"
                  onClick={() => handleTierChange(opt.value)}
                  
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">{t("COPY_CHANNEL")}</label>
            <div className="flex gap-3">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  channel === 'whatsapp'
                    ? 'bg-success border-success text-on-success'
                    : 'bg-input border-border text-secondary hover:text-primary'
                } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-action-1"
                type="button"
                onClick={() => setChannel('whatsapp')}
                
              >
                <MessageCircle size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  channel === 'email'
                    ? 'bg-info border-info text-on-info'
                    : 'bg-input border-border text-secondary hover:text-primary'
                } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-action-2"
                type="button"
                onClick={() => setChannel('email')}
                
              >
                <Mail size={18} strokeWidth={2}/>{t("COPY_EMAIL_2")}</button>
            </div>
          </div>

          {/* Subject — only for email */}
          {isEmailChannel && (
            <div>
              <label htmlFor="churn-subject" className="block text-sm font-medium text-secondary mb-1.5">{t("COPY_EMAIL_SUBJECT_3")}<span className="text-danger" aria-hidden="true">*</span>
              </label>
              <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-churn-subject"
                id="churn-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("COPY_ENTER_EMAIL_SUBJECT")}
                
                aria-required="true"
              />
            </div>
          )}

          {/* Message Body */}
          <div>
            <label htmlFor="churn-message" className="block text-sm font-medium text-secondary mb-1.5">{t("COPY_MESSAGE_2")}<span className="text-danger" aria-hidden="true">*</span>
            </label>
            <textarea className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary placeholder:text-secondary resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-all custom-scrollbar motion-safe:duration-base ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-churn-message"
              id="churn-message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("COPY_WRITE_WIN_BACK_MESSAGE")}
              
              aria-required="true"
              aria-describedby="churn-message-hint"
            />
            <p id="churn-message-hint" className="text-xs text-secondary mt-1">{t("COPY_USE_2")}<code className="bg-input px-1 py-0.5 rounded text-primary">{'{name}'}</code>{t("COPY_AS_PLACEHOLDER_BACKEND_WILL_REPLACE_IT_MEMBERAPOSS_REAL_NAME")}</p>
          </div>

          {/* WhatsApp notice */}
          {channel === 'whatsapp' && (
            <div className="rounded-lg bg-warning border border-warning px-4 py-3 text-xs text-on-warning leading-relaxed">
              ⚠️ <strong>{t("COPY_WHATSAPP_CANNOT_BE_SENT_BULK")}</strong>{t("COPY_CLICKING_QUOT_SEND_QUOT_BELOW_WILL_OPEN_WHATSAPP_PRE")}</div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border shrink-0">
          <button data-testid="manager_communications-manager-churn-recovery-close-2"
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-secondary hover:text-primary bg-transparent motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          >{t("COPY_CANCEL_3")}</button>
          <button data-testid="manager_communications-manager-churn-recovery-send"
            type="button"
            onClick={handleSend}
            disabled={!canSend || isSending || !member}
            className="min-w-32 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-primary-subtle text-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out hover:brightness-110"
          >
            {isSending ? (
              <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>
            ) : (
              <Send size={18} strokeWidth={2}/>
            )}
            {isSending ? t('COPY_SENDING_3') : t('COPY_SEND_WIN_BACK')}
          </button>
        </div>
      </aside>
    </>
  );
}

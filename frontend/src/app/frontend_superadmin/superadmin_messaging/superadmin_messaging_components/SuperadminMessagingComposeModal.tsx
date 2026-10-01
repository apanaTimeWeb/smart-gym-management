import { SUPERADMIN_MESSAGING_CHANNEL_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';
// RESPONSIBILITY: Owns Superadmin Messaging form presentation and client-side Zod validation.
'use client';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, X } from 'lucide-react';

import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';

import { SuperadminMessagingTenantDropdown } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingTenantDropdown';
import { SuperadminMessagingComposeSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingComposeSchema';

import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';
import type { SuperadminMessagingComposeModalProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeModalTypes';

/**
 * @description Owns Superadmin Messaging form presentation and client-side Zod validation.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export function SuperadminMessagingComposeModal({ tenants, isSubmitting, onClose, onSend }: SuperadminMessagingComposeModalProps) {
  const t = useTranslations('superadmin_messaging');
  const { control, register, handleSubmit, formState: { errors, isDirty } } = useForm<SuperadminMessagingComposeValues>({
    resolver: zodResolver(SuperadminMessagingComposeSchema),
    defaultValues: { tenantId: '', channel: SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL, subject: '', body: '' },
    mode: 'onSubmit',
  });

  useUnsavedChangesGuard(isDirty && !isSubmitting, t('ui.unsaved_message_changes'));
  const dialogRef = useSuperadminLayoutDialogA11y(true, onClose);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-compose-title" data-testid="superadmin_messaging-messaging-messaging-compose-modal-dialog" ref={dialogRef}>
      <div className="w-full max-w-lg space-y-4 rounded-xl border border-border bg-overlay p-6 shadow-dialog">
        <div className="flex items-center justify-between">
          <h2 id="superadmin-compose-title" className="text-lg font-bold text-primary">{t('ui.compose_message_2025ce6')}</h2>
          <button type="button" data-autofocus="true" onClick={onClose} disabled={isSubmitting} aria-label={t('ui.close_compose_modal_61a19cd')} className="min-w-11 min-h-11 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-compose-modal-close">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSend)} className="space-y-4" data-testid="superadmin_messaging-superadminmessagingcomposemodal-form-submit">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.tenant_recipient_1e35201')}</label>
            <Controller
              name="tenantId"
              control={control}
              render={({ field }) => <SuperadminMessagingTenantDropdown data-testid="superadmin_messaging-superadmin_messaging-compose-modal-SuperadminMessagingTenantDropdown-50" value={field.value} onChange={field.onChange} tenants={tenants} />}
            />
            {errors.tenantId && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_messaging-messaging-messaging-compose-modal-alert">{errors.tenantId.message}</p>}
          </div>

          <fieldset>
            <legend className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.channel_eaf60de')}</legend>
            <Controller
              name="channel"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {([SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL, SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS, SUPERADMIN_MESSAGING_CHANNEL_CODES.IN_APP] as const).map((channel, index) => (
                    <button  key={channel} type="button" onClick={() => field.onChange(channel)} className={`min-h-11 flex-1 rounded-lg border py-2 text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${field.value === channel ? 'border-border bg-primary-subtle text-primary' : 'border-border bg-transparent text-secondary hover:text-primary'} motion-safe:active:scale-95`} data-testid={`superadmin_messaging-messaging-messaging-compose-modal-action2-${index}`}>
                      {channel}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.channel && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_messaging-messaging-messaging-compose-modal-alert-2">{errors.channel.message}</p>}
          </fieldset>

          <div>
            <label htmlFor="superadmin-message-subject" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.subject_0a48a61')}</label>
            <input id="superadmin-message-subject" type="text" autoComplete="off" maxLength={200} {...register('subject')} placeholder={t('ui.message_subject_25e3f5c')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_messaging-messaging-messaging-compose-modal-control"/>
            {errors.subject && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_messaging-messaging-messaging-compose-modal-alert-3">{errors.subject.message}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-message-body" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.body_b56f9a8')}</label>
            <textarea id="superadmin-message-body" rows={5} maxLength={5000} {...register('body')} placeholder={t('ui.write_your_tenant_level_message_f809ac6')} className="min-h-11 w-full resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_messaging-messaging-messaging-compose-modal-control-2"/>
            {errors.body && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_messaging-messaging-messaging-compose-modal-alert-4">{errors.body.message}</p>}
          </div>

          <p className="text-xs text-secondary">{t('ui.superadmin_messaging_is_restricted_to_tenant_own_781aff1')}</p>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="min-h-11 rounded-lg bg-transparent px-4 py-2 text-sm text-secondary motion-safe:transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-compose-modal-cancel">{t('ui.cancel_4b64e1c')}</button>
            <button type="submit" disabled={isSubmitting} className="min-h-11 flex min-w-24 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-compose-modal-action4">
              {isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"/> : <Send size={18} strokeWidth={2} aria-hidden="true"/>} {isSubmitting ? t('ui.sending') : t('ui.send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

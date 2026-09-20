// RESPONSIBILITY: Owns Superadmin Messaging form presentation and client-side Zod validation.
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Send, X } from 'lucide-react';
import { SuperadminMessagingTenantDropdown } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingTenantDropdown';
import { SuperadminMessagingComposeSchema, type SuperadminMessagingComposeValues } from '@/app/superadmin/messaging/messaging_schemas/SuperadminMessagingComposeSchema';
import type { SuperadminMessagingComposeModalProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingComposeModalTypes';

export function SuperadminMessagingComposeModal({ tenants, isSubmitting, onClose, onSend }: SuperadminMessagingComposeModalProps) {
  const { control, register, handleSubmit, formState: { errors } } = useForm<SuperadminMessagingComposeValues>({
    resolver: zodResolver(SuperadminMessagingComposeSchema),
    defaultValues: { tenantId: '', channel: 'EMAIL', subject: '', body: '' },
    mode: 'onSubmit',
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-compose-title">
      <div className="w-full max-w-lg space-y-4 rounded-2xl border border-border bg-overlay p-6 shadow-dialog">
        <div className="flex items-center justify-between">
          <h2 id="superadmin-compose-title" className="text-lg font-bold text-primary">Compose Message</h2>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close compose modal" className="rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-input hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSend)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">Tenant recipient</label>
            <Controller
              name="tenantId"
              control={control}
              render={({ field }) => <SuperadminMessagingTenantDropdown value={field.value} onChange={field.onChange} tenants={tenants} />}
            />
            {errors.tenantId && <p role="alert" className="mt-1 text-xs text-danger">{errors.tenantId.message}</p>}
          </div>

          <fieldset>
            <legend className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">Channel</legend>
            <Controller
              name="channel"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {(['EMAIL', 'SMS', 'IN_APP'] as const).map((channel) => (
                    <button key={channel} type="button" onClick={() => field.onChange(channel)} className={`flex-1 rounded-lg border py-2 text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${field.value === channel ? 'border-primary/30 bg-primary-subtle text-primary' : 'border-border bg-input text-secondary hover:text-primary'}`}>
                      {channel}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.channel && <p role="alert" className="mt-1 text-xs text-danger">{errors.channel.message}</p>}
          </fieldset>

          <div>
            <label htmlFor="superadmin-message-subject" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">Subject</label>
            <input id="superadmin-message-subject" type="text" autoComplete="off" maxLength={200} {...register('subject')} placeholder="Message subject..." className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            {errors.subject && <p role="alert" className="mt-1 text-xs text-danger">{errors.subject.message}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-message-body" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">Body</label>
            <textarea id="superadmin-message-body" rows={5} maxLength={5000} {...register('body')} placeholder="Write your tenant-level message..." className="w-full resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            {errors.body && <p role="alert" className="mt-1 text-xs text-danger">{errors.body.message}</p>}
          </div>

          <p className="text-xs text-secondary">Superadmin messaging is restricted to tenant owners, admins, and managers. Gym member communication remains in Admin / Manager.</p>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-lg bg-input px-4 py-2 text-sm text-secondary motion-safe:transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60">
              <Send size={18} strokeWidth={2} /> {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

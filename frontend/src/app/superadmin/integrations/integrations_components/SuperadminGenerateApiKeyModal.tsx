// RESPONSIBILITY: Renders the validated Superadmin API-key generation form and one-time generated-secret result.
'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, KeyRound, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminGenerateApiKey } from '@/app/superadmin/integrations/integrations_utils/useSuperadminGenerateApiKey';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';
import type { SuperadminGenerateApiKeyFormValues, SuperadminGenerateApiKeyModalProps } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';


export default function SuperadminGenerateApiKeyModal({ isOpen, tenants, onClose }: SuperadminGenerateApiKeyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useSuperadminGenerateApiKey();
  const { confirm } = useConfirm();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SuperadminGenerateApiKeyFormValues>({
    resolver: zodResolver(SuperadminGenerateApiKeyFormSchema),
    defaultValues: { label: '', tenantId: '', scopes: ['Read'] },
  });

  useUnsavedChangesGuard(Boolean(isOpen && isDirty && !mutation.isPending && !generatedSecret), 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost?');

  // EFFECT INTENT: initializes the one-time secret display and restores focus when this security-sensitive dialog opens.
  useEffect(() => {
    if (!isOpen) return;
    setGeneratedSecret(null);
    idempotencyKeyRef.current = null;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const requestClose = async () => {
    if (mutation.isPending) return;
    if (isDirty && !generatedSecret) {
      const shouldClose = await confirm({
        title: 'Discard API-key changes?',
        message: 'You have entered API-key details that have not been submitted. Discard them?',
        type: 'warning',
        confirmText: 'Discard Changes',
        cancelText: 'Keep Editing',
      });
      if (!shouldClose) return;
    }
    setGeneratedSecret(null);
    idempotencyKeyRef.current = null;
    reset();
    onClose();
  };

  const onSubmit = async (data: SuperadminGenerateApiKeyFormValues) => {
    try {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await mutation.mutateAsync({ payload: data, idempotencyKey: idempotencyKeyRef.current });
      setGeneratedSecret(response.data?.secretKey ?? null);
      idempotencyKeyRef.current = null;
      reset(data);
    } catch {
      // User-visible error is handled by the mutation hook using the backend message. The same idempotency key remains available for a retry.
    }
  };


  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-generate-api-key-title">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-subtle p-2 text-primary"><KeyRound size={18} aria-hidden="true"/></div>
            <div>
              <h2 id="superadmin-generate-api-key-title" className="text-xl font-bold text-primary">Generate API Key</h2>
              <p className="text-sm text-secondary">Issue developer access for a tenant.</p>
            </div>
          </div>
          <button ref={closeButtonRef} type="button" onClick={() => void requestClose()} aria-label="Close generate API key dialog" className="min-h-11 min-w-11 rounded-full p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            <X size={18} aria-hidden="true"/>
          </button>
        </div>

        {generatedSecret ? (
          <div className="space-y-5 p-6">
            <div className="rounded-lg border border-success-bg bg-success-bg p-4">
              <div className="mb-2 flex items-center gap-2 text-success"><Check size={18} aria-hidden="true"/> API key generated</div>
              <p className="text-sm text-secondary">This secret is shown only in this dialog. Store it securely before closing.</p>
            </div>
            <div className="rounded-lg border border-border bg-input p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">Secret key</p>
              <code className="block break-all text-sm text-primary">{generatedSecret}</code>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => void requestClose()} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Done</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col gap-4 p-6">
              <div>
                <label htmlFor="superadmin-api-key-label" className="mb-1 block text-sm font-medium text-secondary">Key Label</label>
                <input id="superadmin-api-key-label" type="text" autoComplete="off" placeholder="e.g. Zapier Integration" {...register('label')} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" aria-invalid={errors.label ? 'true' : 'false'} aria-describedby={errors.label ? 'superadmin-api-key-label-error' : undefined} />
                {errors.label && <p id="superadmin-api-key-label-error" className="mt-1 text-xs text-danger">{errors.label.message}</p>}
              </div>

              <div>
                <label htmlFor="superadmin-api-key-tenant" className="mb-1 block text-sm font-medium text-secondary">Tenant (Gym)</label>
                <select id="superadmin-api-key-tenant" {...register('tenantId')} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" aria-invalid={errors.tenantId ? 'true' : 'false'} aria-describedby={errors.tenantId ? 'superadmin-api-key-tenant-error' : undefined}>
                  <option value="">Select a tenant...</option>
                  {tenants.map((tenant) => <option key={tenant.id} value={tenant.id}>{tenant.name} ({tenant.id})</option>)}
                </select>
                {errors.tenantId && <p id="superadmin-api-key-tenant-error" className="mt-1 text-xs text-danger">{errors.tenantId.message}</p>}
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-secondary">API Scopes</legend>
                <div className="flex flex-wrap gap-4">
                  <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                    <input type="checkbox" value="Read" {...register('scopes')} className="rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary" />
                    Read (Data Export)
                  </label>
                  <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                    <input type="checkbox" value="Write" {...register('scopes')} className="rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary" />
                    Write (Mutations)
                  </label>
                </div>
                {errors.scopes && <p className="mt-1 text-xs text-danger">{errors.scopes.message}</p>}
              </fieldset>

              <div className="rounded-lg border border-border bg-warning-bg p-3">
                <p className="text-xs text-warning"><strong>Important:</strong> The secret key will only be shown once after generation. Make sure the tenant is ready to store it securely.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border bg-sidebar px-6 py-5">
              <button type="button" onClick={() => void requestClose()} disabled={mutation.isPending} className="min-h-11 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary motion-safe:transition-colors hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={mutation.isPending} className="flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50">
                {mutation.isPending && <Loader2 size={18} className="h-4 motion-safe:animate-spin" aria-hidden="true"/>}
                {mutation.isPending ? 'Generating…' : 'Generate Key'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

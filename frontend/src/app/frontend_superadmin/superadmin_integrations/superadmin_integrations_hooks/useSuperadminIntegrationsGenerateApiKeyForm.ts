import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSuperadminIntegrationsGenerateApiKey } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsGenerateApiKey';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_schemas/SuperadminIntegrationsGenerateApiKeySchema';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { SuperadminGenerateApiKeyFormValues } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsGenerateApiKeyTypes';
import type { SubmitHandler } from 'react-hook-form';



// DATA FLOW: Form fields → React Hook Form/Zod → mutation hook → feature API/MSW → TanStack Query cache → generated-secret UI.
// RESPONSIBILITY: Owns API-key generation form setup, submit orchestration, one-time secret state, and idempotency lifecycle. No JSX.
/**
 * @description Owns validated API-key generation form state and mutation orchestration for the integrations feature.
 * @dependencies Uses the feature Zod schema and the dedicated API-key mutation hook; no direct API transport.
 * @edge-case Reuses the same idempotency key across retry attempts for one user intent and clears it only after a successful mutation or explicit form reset.
 */
export function useSuperadminIntegrationsGenerateApiKeyForm() {
  const mutation = useSuperadminIntegrationsGenerateApiKey();
  const idempotencyKeyRef = useRef<string | null>(null);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const form = useForm<SuperadminGenerateApiKeyFormValues>({
    resolver: zodResolver(SuperadminGenerateApiKeyFormSchema),
    defaultValues: { label: '', tenantId: '', scopes: ['READ'] },
  });

  const resetForm = (values?: SuperadminGenerateApiKeyFormValues) => {
    setGeneratedSecret(null);
    idempotencyKeyRef.current = null;
    form.reset(values);
  };

  const handleSubmit: SubmitHandler<SuperadminGenerateApiKeyFormValues> = async (data) => {
    try {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await mutation.mutateAsync({ payload: data, idempotencyKey: idempotencyKeyRef.current });
      setGeneratedSecret(response.data?.secretKey ?? null);
      idempotencyKeyRef.current = null;
      form.reset(data);
    } catch {
      // User-visible error is owned by the dedicated mutation hook; the intent key remains reusable for retry.
    }
  };

  return {
    form,
    mutation,
    generatedSecret,
    idempotencyKeyRef,
    resetForm,
    handleSubmit,
  };
}


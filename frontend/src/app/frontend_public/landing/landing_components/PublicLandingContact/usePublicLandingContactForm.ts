// RESPONSIBILITY: Owns Contact form state, validation, mutation lifecycle, idempotent retry, and dirty-state protection.
// DATA FLOW: Form → RHF/Zod → API client → canonical backend response → user-visible success/error.
'use client';

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPublicLandingContactMessage } from '@/app/frontend_public/landing/landing_api/PublicLandingApi';
import { PublicLandingContactSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingContactSchema';
import { EMPTY_LANDING_CONTACT_FORM } from '@/app/frontend_public/landing/landing_constants/PublicLandingContactFormConstants';
import { LANDING_API_ERROR_CODES } from '@/app/frontend_public/landing/landing_constants/PublicLandingApiErrorConstants';
import { PublicLandingApiRequestError } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';
import { usePublicLandingUnsavedChangesGuard } from '@/app/frontend_public/landing/landing_hooks/usePublicLandingUnsavedChangesGuard';
import type { PublicLandingContactFormValues } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';

/** Orchestrates the contact workflow without rendering JSX.
 * @dependencies RHF, Zod, TanStack Query mutation state, PublicLanding contact API, translations, and dirty-form guard.
 * @edge-case One idempotency key is generated per valid submit intent and reused for retry; it resets only after success or explicit start-new.
 */
export function usePublicLandingContactForm() {
  const t = useTranslations('LANDING');
  const lastSubmittedValues = useRef<PublicLandingContactFormValues | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<PublicLandingContactFormValues>({ defaultValues: EMPTY_LANDING_CONTACT_FORM, resolver: zodResolver(PublicLandingContactSchema), mode: 'onBlur', reValidateMode: 'onChange' });
  const mutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: { values: PublicLandingContactFormValues; idempotencyKey: string }) => sendPublicLandingContactMessage(values, idempotencyKey),
    onSuccess: () => { idempotencyKeyRef.current = null; },
  });

  usePublicLandingUnsavedChangesGuard(form.formState.isDirty && !mutation.isPending && !mutation.isSuccess);

  const submit = form.handleSubmit((values) => {
    if (mutation.isPending) return;
    const idempotencyKey = crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;
    lastSubmittedValues.current = values;
    mutation.mutate({ values, idempotencyKey });
  });

  const retry = useCallback(() => {
    if (mutation.isPending) return;
    const values = lastSubmittedValues.current;
    const idempotencyKey = idempotencyKeyRef.current;
    if (values && idempotencyKey) mutation.mutate({ values, idempotencyKey });
  }, [mutation]);

  const startNewMessage = useCallback(() => {
    mutation.reset(); lastSubmittedValues.current = null; idempotencyKeyRef.current = null; form.reset(EMPTY_LANDING_CONTACT_FORM);
  }, [form, mutation]);

  const error = mutation.error instanceof PublicLandingApiRequestError ? mutation.error : undefined;
  const errorMessage = error?.isBackendMessage
    ? error.message
    : error?.errorCode === LANDING_API_ERROR_CODES.INVALID_RESPONSE
      ? t('errors.invalidResponse')
      : error
        ? t('errors.contactRequestFailed')
        : '';

  return { form, submit, retry, startNewMessage, isSubmitting: mutation.isPending, isSuccess: mutation.isSuccess, errorMessage, successMessage: mutation.data?.message ?? '' };
}

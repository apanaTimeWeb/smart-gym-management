// RESPONSIBILITY: Owns React Hook Form setup, mutation lifecycle, retry behavior, and unsaved-change protection for contact.
// DATA FLOW: LandingContactSchema → React Hook Form → sendLandingContactMessage → TanStack Query mutation → LandingContact view.
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LandingContactSchema } from '@/app/landing/landing_schemas/LandingContactSchema';
import { sendLandingContactMessage } from '@/app/landing/landing_api/landing_api';
import { EMPTY_LANDING_CONTACT_FORM } from '@/app/landing/landing_utils/LandingSharedConstants';
import type { LandingContactFormValues } from '@/app/landing/landing_types/landing_types';

/** Provides isolated contact form state, submission, retry, and success/error presentation state. */
export function useLandingContactForm() {
  const form = useForm<LandingContactFormValues>({
    defaultValues: EMPTY_LANDING_CONTACT_FORM,
    resolver: zodResolver(LandingContactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const mutation = useMutation({ mutationFn: sendLandingContactMessage });
  const lastSubmittedValues = useRef<LandingContactFormValues | null>(null);

  useEffect(() => {
    if (!form.formState.isDirty || mutation.isPending || mutation.isSuccess) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form.formState.isDirty, mutation.isPending, mutation.isSuccess]);

  const submit = form.handleSubmit((values) => {
    lastSubmittedValues.current = values;
    mutation.mutate(values);
  });

  const retry = () => {
    if (lastSubmittedValues.current) mutation.mutate(lastSubmittedValues.current);
  };

  const startNewMessage = () => {
    mutation.reset();
    lastSubmittedValues.current = null;
    form.reset(EMPTY_LANDING_CONTACT_FORM);
  };

  const errorMessage = mutation.error instanceof Error ? mutation.error.message : '';
  const successMessage = mutation.data?.message ?? '';

  return {
    form,
    submit,
    retry,
    startNewMessage,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    errorMessage,
    successMessage,
  };
}

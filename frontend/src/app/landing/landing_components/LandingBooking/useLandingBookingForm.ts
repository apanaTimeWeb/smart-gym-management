// RESPONSIBILITY: Owns React Hook Form setup, mutation lifecycle, retry behavior, and unsaved-change protection for booking.
// DATA FLOW: LandingBookingSchema → React Hook Form → createLandingBooking → TanStack Query mutation → LandingBooking view.
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LandingBookingSchema } from '@/app/landing/landing_schemas/LandingBookingSchema';
import { createLandingBooking } from '@/app/landing/landing_api/landing_api';
import { EMPTY_LANDING_BOOKING_FORM } from '@/app/landing/landing_utils/LandingSharedConstants';
import type { LandingBookingFormValues } from '@/app/landing/landing_types/landing_types';

/** Provides isolated booking form state, submission, retry, and success/error presentation state. */
export function useLandingBookingForm() {
  const form = useForm<LandingBookingFormValues>({
    defaultValues: EMPTY_LANDING_BOOKING_FORM,
    resolver: zodResolver(LandingBookingSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const mutation = useMutation({ mutationFn: createLandingBooking });
  const lastSubmittedValues = useRef<LandingBookingFormValues | null>(null);

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

  const startNewBooking = () => {
    mutation.reset();
    lastSubmittedValues.current = null;
    form.reset(EMPTY_LANDING_BOOKING_FORM);
  };

  const errorMessage = mutation.error instanceof Error ? mutation.error.message : '';
  const successMessage = mutation.data?.message ?? '';

  return {
    form,
    submit,
    retry,
    startNewBooking,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    errorMessage,
    successMessage,
  };
}

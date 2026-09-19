'use client';
// RESPONSIBILITY: Owns React Hook Form state and session-edit submission orchestration; the modal remains a view layer.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrainerSessionsEditFormSchema, type TrainerSessionsEditFormValues } from '@/app/trainer/sessions/sessions_types/TrainerSessionsEditSchema';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { useTrainerSessionMutations } from '@/app/trainer/sessions/sessions_queries/useTrainerSessionMutations';

export function useTrainerSessionsEditForm(session: TrainerSession, onSuccess: (updated: TrainerSession, message: string) => void) {
  const { updateSession } = useTrainerSessionMutations();
  const form = useForm<TrainerSessionsEditFormValues>({ resolver: zodResolver(TrainerSessionsEditFormSchema), defaultValues: { time: session.time ?? '', duration: session.duration ?? '60m', location: session.location ?? '', room: session.room ?? '' } });
  const submit = form.handleSubmit(async (values) => { const response = await updateSession.mutateAsync({ id: session.id, dto: values, idempotencyKey: crypto.randomUUID() }); onSuccess(response.data, response.message); });
  return { ...form, submit, mutation: updateSession };
}

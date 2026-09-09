// RESPONSIBILITY: API functions for the Trainer Progress Tracking module.
// DATA FLOW: TrainerProgressApi → progress_context → TrainerProgressMain

import { apiFetch } from '@/lib/api';
import type { ProgressEntry, ProgressSummary, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { TRAINER_PROGRESS_API_ROUTES } from '@/app/trainer/progress-tracking/progress_utils/progress_url_config';

export async function fetchProgressEntries(memberId: string): Promise<ProgressEntry[]> {
  return apiFetch<ProgressEntry[]>(TRAINER_PROGRESS_API_ROUTES.list(memberId));
}

export async function fetchProgressSummary(memberId: string): Promise<ProgressSummary> {
  return apiFetch<ProgressSummary>(TRAINER_PROGRESS_API_ROUTES.summary(memberId));
}

export async function createProgressEntry(memberId: string, dto: CreateProgressEntryDto): Promise<ProgressEntry> {
  return apiFetch<ProgressEntry>(TRAINER_PROGRESS_API_ROUTES.create(memberId), {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateProgressEntry(memberId: string, entryId: string, dto: Partial<CreateProgressEntryDto>): Promise<ProgressEntry> {
  return apiFetch<ProgressEntry>(TRAINER_PROGRESS_API_ROUTES.update(memberId, entryId), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteProgressEntry(memberId: string, entryId: string): Promise<void> {
  return apiFetch<void>(TRAINER_PROGRESS_API_ROUTES.delete(memberId, entryId), { method: 'DELETE' });
}

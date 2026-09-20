import { z } from 'zod';
import type { 
  ProgressEntry, 
  ProgressSummary, 
  CreateProgressEntryDto, 
  ProgressMemberBasic,
} from '@/app/trainer/progress-tracking/progress_types/TrainerProgress.schema';
import { 
  ProgressEntrySchema, 
  ProgressSummarySchema,
  ProgressMemberBasicSchema
} from '@/app/trainer/progress-tracking/progress_types/TrainerProgress.schema';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ProgressUrlConfig } from '@/app/trainer/progress-tracking/progress-tracking_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export async function fetchProgressMembers(): Promise<ProgressMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.MEMBERS);
  return z.array(ProgressMemberBasicSchema).parse(createTrainerApiResponseSchema(z.array(ProgressMemberBasicSchema)).parse(raw).data ?? []);
}

export async function fetchProgressEntries(memberId: string): Promise<ProgressEntry[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRIES(memberId));
  return z.array(ProgressEntrySchema).parse(createTrainerApiResponseSchema(z.array(ProgressEntrySchema)).parse(raw).data ?? []);
}

export async function fetchProgressSummary(memberId: string): Promise<ProgressSummary> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.SUMMARY(memberId));
  return ProgressSummarySchema.parse(createTrainerApiResponseSchema(ProgressSummarySchema).parse(raw).data);
}

export async function createProgressEntry(memberId: string, dto: CreateProgressEntryDto, idempotencyKey?: string): Promise<ProgressEntry> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRIES(memberId), {
    method: 'POST',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  return ProgressEntrySchema.parse(createTrainerApiResponseSchema(ProgressEntrySchema).parse(raw).data);
}

export async function updateProgressEntry(memberId: string, entryId: string, dto: Partial<CreateProgressEntryDto>, idempotencyKey?: string): Promise<ProgressEntry> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  return ProgressEntrySchema.parse(createTrainerApiResponseSchema(ProgressEntrySchema).parse(raw).data);
}

export async function deleteProgressEntry(memberId: string, entryId: string, idempotencyKey?: string): Promise<void> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'DELETE',
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  createTrainerApiResponseSchema(z.null()).parse(raw);
}

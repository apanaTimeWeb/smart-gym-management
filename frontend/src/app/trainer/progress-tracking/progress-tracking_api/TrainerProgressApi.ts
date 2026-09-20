import { z } from 'zod';
import type { 
  ProgressEntry, 
  ProgressSummary, 
  CreateProgressEntryDto, 
  ProgressMemberBasic,
} from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';
import { 
  ProgressEntrySchema, 
  ProgressSummarySchema,
  ProgressMemberBasicSchema
} from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ProgressUrlConfig } from '@/app/trainer/progress-tracking/progress-tracking_url_config';
import type { ProgressSortField, ProgressSortDirection } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import { TrainerProgressEntriesResponseSchema } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressEntriesResponse.schema';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export async function fetchProgressMembers(): Promise<ProgressMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.MEMBERS);
  return z.array(ProgressMemberBasicSchema).parse(createTrainerApiResponseSchema(z.array(ProgressMemberBasicSchema)).parse(raw).data ?? []);
}

export type ProgressEntriesResponse = { entries: ProgressEntry[]; total: number; page: number; limit: number };

export async function fetchProgressEntries({ memberId, page, limit, sortBy, sortDirection }: { memberId: string; page: number; limit: number; sortBy: ProgressSortField; sortDirection: ProgressSortDirection }): Promise<ProgressEntriesResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), sortBy, sortDirection });
  const raw = await apiFetch<ApiResponse<unknown>>(`${ProgressUrlConfig.BACKEND_API.ENTRIES(memberId)}?${params.toString()}`);
  const schema = createTrainerApiResponseSchema(TrainerProgressEntriesResponseSchema);
  const response = schema.parse(raw);
  if (!response.data) throw new Error(response.message);
  return { entries: response.data.entries, total: response.data.total, page: response.data.page, limit: response.data.limit };
}

export async function fetchProgressSummary(memberId: string): Promise<ProgressSummary> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.SUMMARY(memberId));
  return ProgressSummarySchema.parse(createTrainerApiResponseSchema(ProgressSummarySchema).parse(raw).data);
}

export async function createProgressEntry(memberId: string, dto: CreateProgressEntryDto, idempotencyKey?: string): Promise<{ data: ProgressEntry; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRIES(memberId), {
    method: 'POST',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  const response = createTrainerApiResponseSchema(ProgressEntrySchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

export async function updateProgressEntry(memberId: string, entryId: string, dto: Partial<CreateProgressEntryDto>, idempotencyKey?: string): Promise<{ data: ProgressEntry; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  const response = createTrainerApiResponseSchema(ProgressEntrySchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

export async function deleteProgressEntry(memberId: string, entryId: string, idempotencyKey?: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'DELETE',
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  const response = createTrainerApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

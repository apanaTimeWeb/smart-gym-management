import { z } from 'zod';
import type { 
  ProgressEntry, 
  ProgressSummary, 
  CreateProgressEntryDto, 
  ProgressMemberBasic,
} from '@/app/trainer/progress-tracking/progress_types/progress.schema';
import { 
  ProgressEntrySchema, 
  ProgressSummarySchema,
  ProgressMemberBasicSchema
} from '@/app/trainer/progress-tracking/progress_types/progress.schema';
import { apiFetch } from '@/lib/api';
import { ProgressUrlConfig } from '@/app/trainer/progress-tracking/progress_url_config';

export async function fetchProgressMembers(): Promise<ProgressMemberBasic[]> {
  const raw = await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.MEMBERS);
  return z.array(ProgressMemberBasicSchema).parse(raw.data);
}

export async function fetchProgressEntries(memberId: string): Promise<ProgressEntry[]> {
  const raw = await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.ENTRIES(memberId));
  return z.array(ProgressEntrySchema).parse(raw.data);
}

export async function fetchProgressSummary(memberId: string): Promise<ProgressSummary> {
  const raw = await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.SUMMARY(memberId));
  return ProgressSummarySchema.parse(raw.data);
}

export async function createProgressEntry(memberId: string, dto: CreateProgressEntryDto): Promise<ProgressEntry> {
  const raw = await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.ENTRIES(memberId), {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return ProgressEntrySchema.parse(raw.data);
}

export async function updateProgressEntry(memberId: string, entryId: string, dto: Partial<CreateProgressEntryDto>): Promise<ProgressEntry> {
  const raw = await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
  return ProgressEntrySchema.parse(raw.data);
}

export async function deleteProgressEntry(memberId: string, entryId: string): Promise<void> {
  await apiFetch<unknown>(ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(memberId, entryId), {
    method: 'DELETE',
  });
}

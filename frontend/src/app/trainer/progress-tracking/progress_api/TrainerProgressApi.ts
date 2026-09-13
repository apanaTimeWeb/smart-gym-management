// RESPONSIBILITY: API functions for the Trainer Progress Tracking module.
// DATA FLOW: TanStack Query -> TrainerProgressApi -> Server

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
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
import { MOCK_PROGRESS_ENTRIES, MOCK_PROGRESS_MEMBERS } from '@/app/trainer/progress-tracking/progress_fixtures/TrainerProgressMockData';

let mockEntries = [...MOCK_PROGRESS_ENTRIES];

export async function fetchProgressMembers(): Promise<ProgressMemberBasic[]> {
  await delay(300);
  return z.array(ProgressMemberBasicSchema).parse(MOCK_PROGRESS_MEMBERS);
}

export async function fetchProgressEntries(memberId: string): Promise<ProgressEntry[]> {
  await delay(300);
  const entries = mockEntries.filter(e => e.memberId === memberId);
  return z.array(ProgressEntrySchema).parse(entries);
}

export async function fetchProgressSummary(memberId: string): Promise<ProgressSummary> {
  await delay(300);
  const entries = mockEntries.filter(e => e.memberId === memberId).sort((a, b) => a.date.localeCompare(b.date));
  
  const totalEntries = entries.length;
  const firstEntry = entries[0] || null;
  const latestEntry = entries[entries.length - 1] || null;
  const weightChangeKg = firstEntry && latestEntry ? latestEntry.weightKg - firstEntry.weightKg : 0;
  const bmiChange = firstEntry && latestEntry ? latestEntry.bmi - firstEntry.bmi : 0;

  const summary = {
    memberId,
    memberName: MOCK_PROGRESS_MEMBERS.find(m => m.id === memberId)?.name || 'Unknown',
    totalEntries,
    latestEntry,
    firstEntry,
    weightChangeKg,
    bmiChange,
    goalStatus: 'On Track' as const,
  };

  return ProgressSummarySchema.parse(summary);
}

export async function createProgressEntry(memberId: string, dto: CreateProgressEntryDto): Promise<ProgressEntry> {
  await delay(300);
  const newEntry = {
    id: `prog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    memberId,
    ...dto,
    bmi: Math.round((dto.weightKg / Math.pow(dto.heightCm / 100, 2)) * 10) / 10,
    recordedBy: 'Current Trainer',
  } as ProgressEntry;
  mockEntries = [...mockEntries, newEntry];
  return ProgressEntrySchema.parse(newEntry);
}

export async function updateProgressEntry(memberId: string, entryId: string, dto: Partial<CreateProgressEntryDto>): Promise<ProgressEntry> {
  await delay(300);
  const entryIndex = mockEntries.findIndex(e => e.id === entryId && e.memberId === memberId);
  if (entryIndex === -1) throw new Error('Progress entry not found');

  const oldEntry = mockEntries[entryIndex]!;
  const updatedWeight = dto.weightKg ?? oldEntry.weightKg;
  const updatedHeight = dto.heightCm ?? oldEntry.heightCm;
  const newBmi = Math.round((updatedWeight / Math.pow(updatedHeight / 100, 2)) * 10) / 10;

  const updatedEntry = {
    ...oldEntry,
    ...dto,
    bmi: newBmi,
  } as ProgressEntry;
  
  mockEntries[entryIndex] = updatedEntry;
  return ProgressEntrySchema.parse(updatedEntry);
}

export async function deleteProgressEntry(memberId: string, entryId: string): Promise<void> {
  await delay(300);
  mockEntries = mockEntries.filter(e => !(e.id === entryId && e.memberId === memberId));
}

// RESPONSIBILITY: Defines repository query and projection contracts for Trainer progress tracking.
// FLOW: Query DTO → repository query → typed projection/domain response.

import type { ProgressTrackingProgressEntryDomain } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.domain';

export interface ProgressEntriesQuery { page:number; limit:number; startDate?:string; endDate?:string; sortBy:string; sortDirection:string; }

export interface ProgressTrackingMemberSummary { id:string; name:string; weightKg:number|null; progressStatus:string|null; }

export interface ProgressTrackingSummary { memberId:string; memberName:string; totalEntries:number; latestEntry:ProgressTrackingProgressEntryDomain|null; firstEntry:ProgressTrackingProgressEntryDomain|null; weightChangeKg:number; bmiChange:number; targetWeightKg?:number; targetBodyFatPercent?:number; targetDate?:string; goalStatus?:'On Track'|'Off Track'|'Achieved'; }

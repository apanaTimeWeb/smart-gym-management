// RESPONSIBILITY: Centralized constants for the Trainer Reports module.

import type { TrainerReportTab } from '@/app/trainer/reports/reports_types/TrainerReportsTypes';
import { Users, CalendarCheck, TrendingUp, Dumbbell } from 'lucide-react';

export const REPORT_TABS: TrainerReportTab[] = [
  { id: 'members', label: 'My Members Report' },
  { id: 'attendance', label: 'Attendance Report' },
  { id: 'progress', label: 'Progress Report' },
  { id: 'workout', label: 'Workout Report' },
];

export const REPORT_TAB_ICONS = {
  members: Users,
  attendance: CalendarCheck,
  progress: TrendingUp,
  workout: Dumbbell,
} as const;

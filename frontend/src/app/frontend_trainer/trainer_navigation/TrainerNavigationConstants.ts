import {
  LayoutDashboard,
  Users,
  Utensils,
  Dumbbell,
  CalendarCheck,
  Clock,
  Bell,
  User,
  IndianRupee,
  Calendar,
  TrendingUp,
} from 'lucide-react';

import { TrainerUrlConfig } from '@/app/frontend_trainer/trainer_url_config';

/** Trainer-owned navigation groups used by the shell sidebar and command palette. */
export const TRAINER_NAVIGATION_GROUPS = [
  { groupKey: 'TEXT_NAV_OVERVIEW', items: [{ href: TrainerUrlConfig.DASHBOARD, labelKey: 'TEXT_NAV_DASHBOARD', icon: LayoutDashboard }] },
  { groupKey: 'TEXT_NAV_MEMBERS_TRAINING', items: [
    { href: TrainerUrlConfig.MEMBERS, labelKey: 'TEXT_NAV_MY_MEMBERS', icon: Users },
    { href: TrainerUrlConfig.WORKOUT, labelKey: 'TEXT_NAV_WORKOUT_EXERCISES', icon: Dumbbell },
    { href: TrainerUrlConfig.LIBRARY, labelKey: 'TEXT_NAV_DIET_LIBRARY', icon: Utensils },
    { href: TrainerUrlConfig.SESSIONS, labelKey: 'TEXT_NAV_SESSIONS', icon: Clock },
    { href: TrainerUrlConfig.PROGRESS_TRACKING, labelKey: 'TEXT_NAV_PROGRESS_TRACKING', icon: TrendingUp },
  ] },
  { groupKey: 'TEXT_NAV_SCHEDULE_ATTENDANCE', items: [
    { href: TrainerUrlConfig.ATTENDANCE, labelKey: 'TEXT_NAV_ATTENDANCE', icon: CalendarCheck },
    { href: TrainerUrlConfig.SCHEDULE, labelKey: 'TEXT_NAV_SCHEDULE_LEAVES', icon: Calendar },
  ] },
  { groupKey: 'TEXT_NAV_PERFORMANCE_EARNINGS', items: [{ href: TrainerUrlConfig.EARNINGS, labelKey: 'TEXT_NAV_EARNINGS', icon: IndianRupee }] },
  { groupKey: 'TEXT_NAV_ACCOUNT', items: [
    { href: TrainerUrlConfig.NOTIFICATIONS, labelKey: 'TEXT_NAV_NOTIFICATIONS', icon: Bell },
    { href: TrainerUrlConfig.PROFILE, labelKey: 'TEXT_NAV_MY_PROFILE', icon: User },
  ] },
] as const;

/** Trainer-owned route title/subtitle keys used by the role shell header. */
export const TRAINER_ROUTE_TITLE_MAP: Record<string, { titleKey: string; subtitleKey: string }> = {
  [TrainerUrlConfig.DASHBOARD]: { titleKey: 'TEXT_DASHBOARD_TITLE', subtitleKey: 'TEXT_DASHBOARD_SUBTITLE' },
  [TrainerUrlConfig.ATTENDANCE]: { titleKey: 'TEXT_ATTENDANCE_TITLE', subtitleKey: 'TEXT_ATTENDANCE_SUBTITLE' },
  [TrainerUrlConfig.EARNINGS]: { titleKey: 'TEXT_EARNINGS_TITLE', subtitleKey: 'TEXT_EARNINGS_SUBTITLE' },
  [TrainerUrlConfig.LIBRARY]: { titleKey: 'TEXT_LIBRARY_TITLE', subtitleKey: 'TEXT_LIBRARY_SUBTITLE' },
  [TrainerUrlConfig.MEMBERS]: { titleKey: 'TEXT_MEMBERS_TITLE', subtitleKey: 'TEXT_MEMBERS_SUBTITLE' },
  [TrainerUrlConfig.NOTIFICATIONS]: { titleKey: 'TEXT_NOTIFICATIONS_TITLE', subtitleKey: 'TEXT_NOTIFICATIONS_SUBTITLE' },
  [TrainerUrlConfig.PROFILE]: { titleKey: 'TEXT_PROFILE_TITLE', subtitleKey: 'TEXT_PROFILE_SUBTITLE' },
  [TrainerUrlConfig.PROGRESS_TRACKING]: { titleKey: 'TEXT_PROGRESS_TITLE', subtitleKey: 'TEXT_PROGRESS_SUBTITLE' },
  [TrainerUrlConfig.SCHEDULE]: { titleKey: 'TEXT_SCHEDULE_TITLE', subtitleKey: 'TEXT_SCHEDULE_SUBTITLE' },
  [TrainerUrlConfig.SESSIONS]: { titleKey: 'TEXT_SESSIONS_TITLE', subtitleKey: 'TEXT_SESSIONS_SUBTITLE' },
  [TrainerUrlConfig.WORKOUT]: { titleKey: 'TEXT_WORKOUT_TITLE', subtitleKey: 'TEXT_WORKOUT_SUBTITLE' },
};

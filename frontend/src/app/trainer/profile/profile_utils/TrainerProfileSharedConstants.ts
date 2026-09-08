// RESPONSIBILITY: Centralized constants for the Trainer Profile module.

export const PROFILE_TABS = [
  { id: 'personal' as const, label: 'Personal Info' },
  { id: 'security' as const, label: 'Security' },
] as const;

export type ProfileTabId = typeof PROFILE_TABS[number]['id'];

export const TRAINER_SPECIALIZATIONS = [
  'Strength & Conditioning',
  'Yoga & Flexibility',
  'HIIT & Cardio',
  'Bodybuilding',
  'CrossFit',
  'Pilates',
  'Nutrition & Wellness',
  'Sports Performance',
] as const;

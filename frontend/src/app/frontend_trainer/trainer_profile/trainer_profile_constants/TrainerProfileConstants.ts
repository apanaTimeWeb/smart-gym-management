// RESPONSIBILITY: Centralized static UI configuration for Trainer Profile.
// DATA FLOW: Profile UI -> translation keys -> rendered labels; values remain domain identifiers.
export const TRAINER_PROFILE_PROFILE_TABS = [
  { id: 'personal' as const, labelKey: 'TEXT_PERSONAL_INFO' },
  { id: 'security' as const, labelKey: 'TEXT_SECURITY' },
] as const;

export type TrainerProfileProfileTabId = typeof TRAINER_PROFILE_PROFILE_TABS[number]['id'];

export const TRAINER_PROFILE_SPECIALIZATIONS = [
  { value: 'Strength & Conditioning', labelKey: 'TEXT_SPECIALIZATION_STRENGTH_CONDITIONING' },
  { value: 'Yoga & Flexibility', labelKey: 'TEXT_SPECIALIZATION_YOGA_FLEXIBILITY' },
  { value: 'HIIT & Cardio', labelKey: 'TEXT_SPECIALIZATION_HIIT_CARDIO' },
  { value: 'Bodybuilding', labelKey: 'TEXT_SPECIALIZATION_BODYBUILDING' },
  { value: 'CrossFit', labelKey: 'TEXT_SPECIALIZATION_CROSSFIT' },
  { value: 'Pilates', labelKey: 'TEXT_SPECIALIZATION_PILATES' },
  { value: 'Nutrition & Wellness', labelKey: 'TEXT_SPECIALIZATION_NUTRITION_WELLNESS' },
  { value: 'Sports Performance', labelKey: 'TEXT_SPECIALIZATION_SPORTS_PERFORMANCE' },
] as const;

export const TRAINER_PROFILE_TAB_IDS = ['personal', 'security'] as const;

export const TRAINER_PROFILE_PASSWORD_FIELDS = [
  { name: 'currentPassword' as const, labelKey: 'TEXT_CURRENT_PASSWORD', key: 'current' as const },
  { name: 'newPassword' as const, labelKey: 'TEXT_NEW_PASSWORD', key: 'next' as const },
  { name: 'confirmPassword' as const, labelKey: 'TEXT_CONFIRM_NEW_PASSWORD', key: 'confirm' as const },
] as const;

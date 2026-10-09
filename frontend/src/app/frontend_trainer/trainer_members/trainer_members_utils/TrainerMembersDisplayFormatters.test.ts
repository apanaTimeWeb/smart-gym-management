import { describe, expect, it } from 'vitest';

import {
  TrainerMembersDisplayValue,
  TrainerMembersFormatDate,
  TrainerMembersFormatNumber,
  TrainerMembersMaskSensitiveData,
} from '@/app/frontend_trainer/trainer_members/trainer_members_utils/TrainerMembersDisplayFormatters';




describe('Trainer members display formatters', () => {
  it('preserves zero and masks absent values with an en-dash', () => {
    expect(TrainerMembersDisplayValue(0)).toBe(0);
    expect(TrainerMembersDisplayValue(null)).toBe('—');
  });
  it('formats numbers and masks contact values', () => {
    expect(TrainerMembersFormatNumber(1234567, 'en-IN')).toBe('12,34,567');
    expect(TrainerMembersFormatNumber(22.5, 'en-IN')).toBe('22.5');
    expect(TrainerMembersMaskSensitiveData('9876543210')).toBe('98****3210');
  });
  it('renders invalid dates safely', () => {
    expect(TrainerMembersFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
});

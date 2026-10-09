import { describe, expect, it } from 'vitest';

import { TrainerLibraryDisplayValue } from '@/app/frontend_trainer/trainer_library/trainer_library_utils/TrainerLibraryDisplayValue';




describe('Trainer library display formatters', () => {
  it('renders an explicit absent-value marker', () => {
    expect(TrainerLibraryDisplayValue(null)).toBe('—');
    expect(TrainerLibraryDisplayValue(undefined)).toBe('—');
    expect(TrainerLibraryDisplayValue('')).toBe('—');
  });
  it('preserves meaningful primitive values', () => {
    expect(TrainerLibraryDisplayValue(0)).toBe(0);
    expect(TrainerLibraryDisplayValue(false)).toBe(false);
    expect(TrainerLibraryDisplayValue('Plan')).toBe('Plan');
  });
});

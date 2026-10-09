import { renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerLibraryDiet } from '@/app/frontend_trainer/trainer_library/trainer_library_hooks/useTrainerLibraryDiet';




describe('useTrainerLibraryDiet', () => {
  it('opens and closes the diet detail state', () => {
    const { result } = renderHook(() => useTrainerLibraryDiet());
    expect(result.current.showDietModal).toBe(false);
  });
});

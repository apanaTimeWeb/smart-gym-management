import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryExerciseForm';


vi.mock('@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryLogic', () => ({
  useManagerLibraryLogic: vi.fn(() => ({
    showExerciseModal: false,
    setShowExerciseModal: vi.fn(),
    editExerciseId: null,
    editExerciseData: null,
    saving: false,
    saveExercise: vi.fn(async () => undefined),
  })),
}));

vi.mock('@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard', () => ({
  useManagerUnsavedChangesGuard: vi.fn(() => ({ confirmAndClose: vi.fn(async (close: () => void) => close()) })),
}));

describe('useManagerLibraryExerciseForm', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerLibraryExerciseForm).toBe('function');
  });

  it('initializes the RHF-backed public contract without requiring a backend', () => {
    const { result } = renderHook(() => moduleUnderTest.useManagerLibraryExerciseForm());

    expect(result.current.showExerciseModal).toBe(false);
    expect(result.current.editExerciseId).toBeNull();
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.handleClose).toBe('function');
    expect(typeof result.current.submit).toBe('function');
  });
});

'use client';
// DATA FLOW: UI input value → useManagerDebouncedValueCommit → supplied feature commit callback.

import { useEffect } from 'react';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';

/**
 * @description Commits a debounced value to an external setter without exposing React effect lifecycle logic to UI components.
 * @dependencies Uses the zero-business Manager debounce infrastructure hook and the supplied callback.
 * @edge-case Skips commits when the debounced value is already equal to the committed value.
 */
export function useManagerDebouncedValueCommit<T>(value: T, committedValue: T, onCommit: (nextValue: T) => void, delay = 300): void {
  const debouncedValue = useManagerDebounce(value, delay);
  // EFFECT: Commit only after the debounce completes so search/filter UI does not call the backend on every keystroke.
  useEffect(() => {
    if (debouncedValue !== committedValue) onCommit(debouncedValue);
  }, [committedValue, debouncedValue, onCommit]);
}

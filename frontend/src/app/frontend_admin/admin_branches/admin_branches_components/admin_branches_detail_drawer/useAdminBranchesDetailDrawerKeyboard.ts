"use client";
import { useEffect } from 'react';

/**
 * @description Binds Escape-key dismissal for the branches detail drawer.
 * @dependencies React useEffect and the module-owned closeDetail callback.
 * @edge-case Removes the document listener on close/unmount and when the drawer is disabled.
 */
export function useAdminBranchesDetailDrawerKeyboard(enabled: boolean, closeDetail: () => void) {
  useEffect(() => {
    if (!enabled) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, closeDetail]);
}

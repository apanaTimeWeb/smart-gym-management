'use client';
import { useMemo } from 'react';

export interface PermissionCapabilitySnapshot {
  can: (capability: string) => boolean;
}

/** Global permission capability contract; the host application replaces this implementation with its session-aware hook. */
export function usePermissions(): PermissionCapabilitySnapshot {
  return useMemo(() => ({
    can: (capability: string) => capability === 'manager.access' && typeof window !== 'undefined',
  }), []);
}

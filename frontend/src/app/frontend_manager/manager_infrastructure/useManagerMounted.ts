'use client';
// DATA FLOW: React lifecycle → useManagerMounted → component render gate for browser-only surfaces.

import { useEffect, useState } from 'react';

/**
 * @description Reports whether the current browser component has mounted; useful for portal/print surfaces that require DOM availability.
 * @dependencies React lifecycle only; contains zero business behavior.
 * @edge-case Returns false during SSR/initial render and true after the first client effect.
 */
export function useManagerMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  // EFFECT: Flip the browser-mounted flag once after hydration so portal/DOM consumers avoid SSR access.
  useEffect(() => setMounted(true), []);
  return mounted;
}

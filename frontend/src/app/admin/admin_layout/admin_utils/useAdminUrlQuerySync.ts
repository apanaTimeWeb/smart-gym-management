"use client";

// RESPONSIBILITY: Synchronizes shareable Admin list UI state with Next.js URL query parameters.
// DATA FLOW: Admin feature UI state → useAdminUrlQuerySync → Next.js URL → feature hook/store.

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export type AdminUrlQueryValue = string | number | null | undefined;
export interface AdminUrlQueryBinding {
  key: string;
  value: AdminUrlQueryValue;
  defaultValue?: AdminUrlQueryValue;
  setValue?: (value: string) => void;
}

/** Synchronizes module-owned filter/pagination state with the current route query string. */
export function useAdminUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deps = JSON.stringify(bindings.map(({ key, value, defaultValue }) => ({ key, value, defaultValue })));
  const stableBindings = useMemo(() => bindings, [deps]);

  useEffect(() => {
    stableBindings.forEach(({ key, value, setValue }) => {
      if (!setValue) return;
      const raw = searchParams.get(key);
      if (raw !== null && raw !== String(value)) setValue(raw);
    });
    // URL is the authoritative source only when a query parameter is explicitly present.
     
  }, [searchParams, stableBindings]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());
    stableBindings.forEach(({ key, value, defaultValue }) => {
      const normalized = value === null || value === undefined ? '' : String(value);
      const normalizedDefault = defaultValue === null || defaultValue === undefined ? '' : String(defaultValue);
      if (!normalized || normalized === normalizedDefault) next.delete(key);
      else next.set(key, normalized);
    });
    const query = next.toString();
    const current = searchParams.toString();
    if (query !== current) router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, stableBindings]);
}

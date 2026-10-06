"use client";
// RESPONSIBILITY: Provides the zero-business Admin data-density preference to the authenticated shell.
import { useMemo, useState } from 'react';
import { AdminLayoutDensityContext } from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutDensityContext';
import type { AdminDensity, AdminLayoutDensityProviderProps } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

/** Provides the compact/comfortable density setting without owning server state. */
export function AdminLayoutDensityProvider({ children }: AdminLayoutDensityProviderProps) {
  const [density, setDensity] = useState<AdminDensity>('comfortable');
  const toggleDensity = useMemo(() => () => setDensity((current) => current === 'comfortable' ? 'compact' : 'comfortable'), []);
  const value = useMemo(() => ({ density, setDensity, toggleDensity }), [density, toggleDensity]);
  return <AdminLayoutDensityContext.Provider value={value}><div data-admin-density={density} className="min-h-screen">{children}</div></AdminLayoutDensityContext.Provider>;
}

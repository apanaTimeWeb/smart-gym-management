"use client";
// RESPONSIBILITY: Reads the authenticated shell's zero-business data-density preference.
import { useContext } from 'react';
import { AdminLayoutDensityContext } from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutDensityContext';

/** Returns the active Admin density preference for shell controls. */
export function useAdminLayoutDensity() {
  const value = useContext(AdminLayoutDensityContext);
  if (!value) throw new Error('useAdminLayoutDensity must be used inside AdminLayoutDensityProvider');
  return value;
}
